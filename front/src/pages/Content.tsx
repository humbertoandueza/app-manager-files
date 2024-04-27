import { Box, Button, Grid, MenuItem, Select, TextField, styled } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { Controller, FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { createContent, getCategory, getThematic } from '../services/services';



const Content = () => {
    const [categories, setCategories] = useState<any[]>([]);
    const [thematics, setThematics] = useState<any[]>([]);
    const [typeUpload, setTypeUpload] = useState<boolean | null>(null);
    const [selectedImage, setSelectedImage] = useState<string | null>(null);

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
        if (typeUpload) {
            data = {
                title: data.title,
                thematic: data.thematic,
                file: data.file,
                category: data.category,
            }
        } else {
            data = {
                title: data.title,
                thematic: data.thematic,
                url: data.url,
                category: data.category,
            }
        }

        try {
            const result = await createContent(data)
            clearForm()
        } catch (error) {

        }

    };

    const getInfoAll = async () => {
        try {
            const listThematics = await getThematic()
            setThematics(listThematics.results)
        } catch (error) {
            console.error('List no found', error);
            throw error;
        }
    }

    const handleThematicChange = async (thematic: any) => {
        const permissions = thematic?.permissions;

        const truePermissions = Object.entries(permissions).reduce((acc: any, [item, value]) => {
            if (value === true) {
                acc.push(item);
            }
            return acc;
        }, []);
        const queryParam = truePermissions.join(',');
        const listCategories = await getCategory(queryParam);
        setCategories(listCategories.results);

    }

    const handleCategoryChange = async (Category: any) => {
        const type = Category?.type;
        type == 'images' ? setTypeUpload(true) : setTypeUpload(false);
    }

    const {
        control,
        register,
        reset,
        handleSubmit: handleFormSubmit,
        formState: { errors },
    } = useForm({
        defaultValues: {
            title: '',
            category: categories[0]?.type || '',
            thematic: thematics[0]?.name || '',
            file: null,
            url: '',
        },
    });

    const handleImageChange = (e: { target: { files: (Blob | MediaSource)[]; }; }) => {
        if (e.target.files && e.target.files[0]) {
            let img = URL.createObjectURL(e.target.files[0]);
            setSelectedImage(img);
        }
    };

    const clearForm = () => {
        reset();
        setSelectedImage(null)
        setTypeUpload(null)

    };


    useEffect(() => {
        getInfoAll()
    }, [])




    return (
        <Grid
            sx={{
                px: { xs: 2, sm: 4, md: 6 }, pt: 4
            }}
        >
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: "center" }}>
                <form onSubmit={handleFormSubmit(handleSubmit as SubmitHandler<FieldValues>)} style={{ maxWidth: '992px', width: '100%', }}>
                    <Grid container columnSpacing={2} rowGap={2}>
                        <Grid item xs={12} sm={6}>
                            <Box mb={2}>
                                <TextField
                                    variant="outlined"
                                    placeholder='Name'
                                    fullWidth
                                    {...register("title")}
                                />
                            </Box>
                            <Box mb={2}>
                                <Controller
                                    name="thematic"
                                    control={control}
                                    render={({ field }) => (
                                        <Select
                                            {...field}
                                            fullWidth
                                            variant="outlined"
                                            error={!!errors.thematic}
                                            onChange={(event) => {
                                                field.onChange(event.target.value);

                                                const selectedThematicId = event.target.value;
                                                const selectedThematic = thematics.find(thematic => thematic.id === selectedThematicId);
                                                selectedThematic && handleThematicChange(selectedThematic);
                                            }}
                                        >
                                            {thematics && thematics.map((thematic) => (
                                                <MenuItem key={thematic.id} value={thematic.id}>
                                                    {thematic.name}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    )}
                                />
                            </Box>
                            <Box mb={2}>
                                <Controller
                                    name="category"
                                    control={control}
                                    render={({ field }) => (
                                        <Select
                                            {...field}
                                            fullWidth
                                            variant="outlined"

                                            onChange={(event) => {
                                                field.onChange(event.target.value);

                                                const selectedCategoryId = event.target.value;
                                                const selectedCategory = categories.find(category => category.id === selectedCategoryId);
                                                selectedCategory && handleCategoryChange(selectedCategory);
                                            }}
                                        >
                                            {categories && categories.map((category) => (
                                                <MenuItem key={category.id} value={category.id}>
                                                    {category.name}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    )}
                                />
                            </Box>
                            <Box mb={2}>
                                <Button fullWidth style={{ color: 'white' }} type="submit" variant="contained" color='primary'>
                                    Create
                                </Button>
                            </Box>
                        </Grid>

                        <Grid item xs={12} sm={6} >
                            {
                                typeUpload ? (
                                    <>
                                        {selectedImage && <div style={{ display: 'flex', flexDirection: 'column', alignItems: "center" }}>
                                            <div style={{ outline: '2px solid #222', height: '250px', width: '250px' }}>
                                                <img style={{ objectFit: 'cover', height: '100%' }} src={selectedImage ?? ''} alt="Image" />
                                            </div>
                                        </div>
                                        }

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
                                                <VisuallyHiddenInput type="file"  {...register("file", { onChange: handleImageChange })}
                                                />
                                            </Button>
                                            {selectedImage &&
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
                                            }

                                        </Box>
                                    </>

                                ) :

                                    <>
                                        {typeUpload === false &&
                                            <Box mb={2}>
                                                <TextField
                                                    variant="outlined"
                                                    placeholder='Url'
                                                    fullWidth
                                                    {...register("url")}
                                                />
                                            </Box>

                                        }

                                    </>
                            }
                        </Grid>
                    </Grid>
                </form>
            </div>
        </Grid>

    )
}

export default Content