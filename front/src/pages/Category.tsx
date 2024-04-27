import styled from '@emotion/styled';
import { Controller, FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { createCategory, getCategory, DeleteCategory, EditCategory } from '../services/services';
import { MediaType, typeCategory } from '../interfaces';
import { Box, Button, Grid, MenuItem, Select, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from "@mui/material";
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';




function Category() {
    const [categories, setCategories] = useState<typeCategory[]>([]);
    const navigate = useNavigate();
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const [editingCategory, setEditingCategory] = useState<typeCategory | null>(null);
    const [editActive, setEditActive] = useState<boolean>(false);
    const [editFile, setEditFile] = useState<boolean>(false);


    const VisuallyHiddenInput = styled('input')({
        clip: 'rect(0 0 0 0)',
        clipPath: 'inset(50%)',
        height: 1,
        overflow: 'hidden',
        position: 'absolute',
        bottom: 0,
        left: 0,
        whiteSpace: 'nowrap',
        width: 1,
    });


    const handleSubmit = async (data: any) => {
        data.image = data.coverImage[0];
        if (data.image) {
            let img = URL.createObjectURL(data.image);
            setSelectedImage(img);
        }

        if (editActive) {
            data.id = editingCategory?.id;
        }


        try {
            !editActive ? await createCategory(data) : await EditCategory(data)
            clearForm()
            getCategories()
            setEditActive(false)

        } catch (error) {
            console.log('error: ', error);
            setEditActive(false)


        }

    };
    const deleteCat = async (data: any) => {
        try {
            await DeleteCategory(data.id)
            reset()
            getCategories()
        } catch (error) {

        }

    };

    const handleImageChange = (e: { target: { files: (Blob | MediaSource)[]; }; }) => {
        if (e.target.files && e.target.files[0]) {
            let img = URL.createObjectURL(e.target.files[0]);
            setSelectedImage(img);
            setEditFile(true)
        }
    };

    const getUrl = (url: string) => {
        const imageUrl = `https://ll6zw4n2-3000.use2.devtunnels.ms/public${url}`;
        return imageUrl;
    }

    const getCategories = async () => {
        try {
            let data = await getCategory();
            if (data) {
                setCategories(data.results);
            }

        } catch (error) {
            console.log('error: ', error);
        }
    }



    const handleEditClick = (category: typeCategory) => {
        setEditingCategory(category)
        setEditActive(true)
        if (category) {
            setValue("name", category.name);
            setValue("type", category.type.charAt(0).toUpperCase() + category.type.slice(1));
        }
    };
    const clearForm = () => {
        reset();
        setSelectedImage(null);
        setEditingCategory(null);
        setEditFile(false)
    };

    useEffect(() => {
        getCategories()
    }, [])




    const {
        control,
        register,
        handleSubmit: handleFormSubmit,
        formState: { errors },
        reset,
        setValue
    } = useForm({
        defaultValues: editingCategory || {}
    });



    return (

        <Grid
            sx={{
                px: { xs: 2, sm: 4, md: 6 }, pt: 4
            }}
        >


            <Typography align='left' variant="h5" gutterBottom>
                Category
            </Typography>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: "center" }}>
                <form onSubmit={handleFormSubmit(handleSubmit as SubmitHandler<FieldValues>)} style={{ maxWidth: '992px', width: '100%', }}>
                    <Grid container columnSpacing={2} rowGap={2}>
                        <Grid item xs={12} sm={6}>
                            <Box mb={2}>
                                <TextField
                                    variant="outlined"
                                    placeholder='Name'
                                    fullWidth
                                    {...register("name")}
                                />
                            </Box>
                            <Box mb={2}>
                                <Controller
                                    name="type"
                                    control={control}
                                    defaultValue={MediaType.Images}
                                    render={({ field }) => (
                                        <Select
                                            {...field}
                                            fullWidth
                                            variant="outlined"
                                        >
                                            <MenuItem value={MediaType.Images}>Images</MenuItem>
                                            <MenuItem value={MediaType.Videos}>Videos</MenuItem>
                                            <MenuItem value={MediaType.Documents}>Documents</MenuItem>
                                        </Select>
                                    )}
                                />
                            </Box>
                            <Box mb={2}>
                                <Button
                                    component="label"
                                    role={undefined}
                                    variant="outlined"
                                    color='primary'
                                    tabIndex={-1}
                                    style={{ margin: '10px' }}
                                >
                                    Upload file
                                    <VisuallyHiddenInput type="file" {...register("coverImage", { onChange: handleImageChange })} />
                                </Button>
                                <Button
                                    role={undefined}
                                    variant="outlined"
                                    color='error'
                                    tabIndex={-1}
                                    style={{ margin: '10px' }}
                                    onClick={() => clearForm()}
                                >
                                    Clear
                                </Button>
                            </Box>
                            <Box mb={2}>
                                <Button fullWidth style={{ color: 'white' }} type="submit" variant="contained" color={editingCategory ? 'secondary' : 'primary'}>
                                    {editingCategory ? 'Update' : 'Create'}
                                </Button>
                            </Box>
                        </Grid>

                        <Grid item xs={12} sm={6} >
                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: "center" }}>
                                <div style={{ outline: '2px solid #222', height: '250px', width: '250px' }}>
                                    {
                                        (!editActive || editFile) ?
                                            <>
                                                {selectedImage &&
                                                    <img style={{ objectFit: 'cover', height: '100%' }} src={selectedImage} alt="1" />
                                                }
                                            </>
                                            :
                                            <>
                                                {editingCategory &&
                                                    <img style={{ objectFit: 'cover', height: '100%' }} src={getUrl(editingCategory?.coverImage)} alt="preview" />

                                                }
                                            </>

                                    }
                                </div>
                            </div>

                        </Grid>

                    </Grid>
                </form>
                <TableContainer style={{ width: '100vw', maxWidth: '1200px' }} sx={{ mt: 4 }}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Name</TableCell>
                                <TableCell>Type</TableCell>
                                <TableCell>Cover Image</TableCell>
                                <TableCell>Action</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {categories && categories.map((category: any) => (
                                <TableRow key={category.id}>
                                    <TableCell>{category.name}</TableCell>
                                    <TableCell>{category.type}</TableCell>
                                    <TableCell><img src={getUrl(category.coverImage)} alt={category.name} style={{ width: '50px', height: '50px' }} /></TableCell>


                                    <TableCell style={{ width: '20%' }}>
                                        <div style={{ display: 'flex', gap: '10px' }}>
                                            <Button variant="text" color="primary" onClick={() => handleEditClick(category)}>
                                                Edit
                                            </Button>
                                            <Button variant="text" color="error" onClick={() => deleteCat(category)}>
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
        </Grid>
    );
}

export default Category