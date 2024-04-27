import React, { useState, useEffect } from 'react';
import { Typography, Grid, TextField, Button, Table, TableContainer, TableHead, TableBody, TableRow, TableCell, Box, Select, MenuItem } from "@mui/material";
import { Controller, FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { DeleteThematic, EditThematic, createThematic, getThematic } from '../services/services';
import { MediaType, typePermissions } from '../interfaces';
import { Theme, useTheme } from '@mui/material/styles';
import { CancelOutlined, CheckCircleOutline } from '@mui/icons-material';

function Thematic() {
  const [thematic, setThematic] = useState<typePermissions[]>([]);

  const [editThematic, setEditThematic] = useState<typePermissions | null>(null);
  const theme = useTheme();

  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      },
    },
  };

  const names = Object.values(MediaType);

  function getStyles(name: string, personName: string[], theme: Theme) {
    return {
      fontWeight:
        personName.indexOf(name) === -1
          ? theme.typography.fontWeightRegular
          : theme.typography.fontWeightMedium,
    };
  }



  const handleSubmit = async (data: any) => {
    const permissions = data.permissions.reduce((acc: any, item: string) => {
      acc[item.toLowerCase()] = true;
      return acc;
    }, {});

    const payload = {
      _id: editThematic?.id,
      name: data.name,
      permissions: permissions
    }
    try {
      false ? await createThematic(payload) : await EditThematic(payload)
      reset()
      getThematics()
    } catch (error) {
      console.log('error: ', error);

    }

  };

  const getThematics = async () => {
    try {
      let data = await getThematic();
      if (data) {
        setThematic(data.results);
      }

    } catch (error) {
      console.log('error: ', error);
    }
  }

  const handleEditClick = (thematic: typePermissions) => {
    setEditThematic(thematic)
    if (thematic) {
      setValue("name", thematic.name);
      const permissionsArray = Object.keys(thematic.permissions).filter((key: any) => thematic.permissions).map((key) => key.charAt(0).toUpperCase() + key.slice(1));
      setValue("permissions", permissionsArray);
    }
  };

  const deleteThe = async (data: any) => {
    try {
      await DeleteThematic(data.id)
      getThematics()
    } catch (error) {

    }

  };


  useEffect(() => {
    getThematics()
  }, [])

  const {
    control,
    register,
    handleSubmit: handleFormSubmit,
    formState: { errors },
    reset,
    setValue
  } = useForm({
  });

  return (
    <>
      <Grid
        sx={{
          px: { xs: 2, sm: 4, md: 6 }, pt: 4
        }}
      >


        <Typography align='left' variant="h5" gutterBottom>
          Thematic
        </Typography>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: "center" }}>
          <form onSubmit={handleFormSubmit(handleSubmit as SubmitHandler<FieldValues>)} style={{ maxWidth: '992px', width: '100%', }}>
            <Grid container columnSpacing={2} rowGap={2} alignItems='center'>
              <Grid item xs={12} sm={5}>
                <Box mb={2}>
                  <TextField
                    variant="outlined"
                    placeholder='Name'
                    fullWidth
                    {...register("name")}
                  />
                </Box>

              </Grid>
              <Grid item xs={12} sm={5}>
                <Box mb={2}>
                  <Controller
                    name="permissions"
                    control={control}
                    defaultValue={[]}
                    render={({ field }) => (
                      <Select
                        {...field}
                        multiple
                        fullWidth
                        variant="outlined"
                        MenuProps={MenuProps}
                      >
                        {names.map((name: any) => (
                          <MenuItem
                            key={name}
                            value={name}
                            style={getStyles(name, field.value, theme)}
                          >
                            {name}
                          </MenuItem>
                        ))}
                      </Select>
                    )}
                  />
                </Box>
              </Grid>

              <Grid item xs={12} sm={2}>
                <Box mb={2}>
                  <Button fullWidth style={{ color: 'white' }} type="submit" variant="contained" color={editThematic ? 'secondary' : 'primary'}>
                    {editThematic ? 'Update' : 'Create'}
                  </Button>
                </Box>
              </Grid>


            </Grid>
          </form>
          <div style={{ display: 'flex', flexDirection: 'row', alignItems: "center" }}>
            <TableContainer style={{ width: '100vw', maxWidth: '1200px' }} sx={{ mt: 4, px:4 }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell ><div className="flex-center">Images</div></TableCell>
                    <TableCell ><div className="flex-center">Videos</div></TableCell>
                    <TableCell ><div className="flex-center">Documents</div></TableCell>
                    <TableCell>Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {thematic && thematic.map((thematic: any) => (
                    <TableRow key={thematic.id}>
                      <TableCell>{thematic.name}</TableCell>
                      <TableCell>
                        <div className='flex-center'>
                          {thematic.permissions.images ? <CheckCircleOutline color='secondary' /> : <CancelOutlined color='error' />}
                        </div>
                      </TableCell>
                      <TableCell style={{ width: '15%' }}>
                        <div className='flex-center'>
                          {thematic.permissions.videos ? <CheckCircleOutline color='secondary' /> : <CancelOutlined color='error' />}
                        </div>
                      </TableCell>
                      <TableCell style={{ width: '15%' }}>
                        <div className='flex-center'>
                          {thematic.permissions.documents ? <CheckCircleOutline color='secondary' /> : <CancelOutlined color='error' />}
                        </div>
                      </TableCell>
                      <TableCell style={{ width: '20%' }}>
                        <div style={{ display: 'flex', gap: '10px' }}>
                          <Button variant="text" color="primary" onClick={() => handleEditClick(thematic)} >
                            Edit
                          </Button>
                          <Button variant="text" color="error" onClick={() => deleteThe(thematic)} >
                            Delete
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>

        </div>
      </Grid>
    </>
  )
}
export default Thematic;
