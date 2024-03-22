import { Button, Label, Modal, Select, TextInput, Datepicker } from 'flowbite-react'
import { useFormik } from 'formik';
import React from 'react'
import *  as yup from "yup"
import { confimAlert, customAlert } from '../../../../config/alerts/alert';
import AxiosClient from '../../../../config/http-client/axios-client';

const RegisterUserForm = ({ isCreating, setIsCreating, getAllUsers }) => {
    const closeModal = () => {
        formik.resetForm();
        setIsCreating(false);
    }

    const handleChangeAvatar = () => {
        console.log('hola');
       
    }
    const formik = useFormik({
        initialValues: {
            username: "",
            password: "",
            confirmPassword: "",
            roles: '',
            name: "",
            surname: "",
            lastname: "",
            curp: "",
            birthdate: "",
            avatar: ""
        },
        validationSchema: yup.object().shape({
            username: yup.string().required("Campo obligatorio").min(3, "Minimo 3 caracteres").max(45, "Maximo 45 caracteres"),
            password: yup.string().required("Campo obligatorio").min(8, "Minimo 8 caracteres").max(45, "Maximo 45 caracteres"),
            confirmPassword: yup.string().required("Campo obligatorio").min(8, "Minimo 8 caracteres").max(45, "Maximo 45 caracteres").test("password-matches", "Las contraseñas no coinciden", function (value) { return value === this.parent.password }),
            name: yup.string().required("Campo obligatorio").min(3, "Minimo 3 caracteres").max(45, "Maximo 45 caracteres"),
            surname: yup.string().required("Campo obligatorio").min(3, "Minimo 3 caracteres").max(45, "Maximo 45 caracteres"),
            lastname: yup.string().min(3, "Minimo 3 caracteres").max(45, "Maximo 45 caracteres"),
            curp: yup.string().required("Campo obligatorio").min(3, "Minimo 18 caracteres").max(18, "Maximo 18 caracteres"),
            birthdate: yup.string().required("Campo obligatorio")
        }),
        onSubmit: async (values, { setSubmitting }) => {
            confimAlert(async () => {
                try {
                    const payload = {
                        ...values,
                        birthDate: values.birthdate,
                        user: {
                            username: values.username,
                            password: values.password,
                            roles: parseInt(values.roles),
                        },
                    };
                    const response = await AxiosClient({
                        method: 'POST',
                        url: '/person/',
                        data: payload
                    });
                    if (!response.error) {
                        customAlert(
                            'Registro exitoso',
                            'El usuario se ha registrado correctamente',
                            'success');
                        getAllUsers();
                        closeModal();
                    }
                } catch (error) {
                    customAlert(
                        'Ocurrio un error',
                        'Error al registrar usuario',
                        'error')
                        console.log(error);
                } finally {

                }
            });
        }
    })

    return (
        <Modal show={isCreating} onClose={closeModal} size={'4xl'}>
            <Modal.Header title={"Registrar usuario"} />
            <Modal.Body>
                <form id='userForm' name='userForm' noValidate onSubmit={formik.handleSubmit}>
                    <div className='flex flex-col gap-2'>
                        <h3 className='font-bold text-2xl'>Datos de usuario</h3>
                        <div className='grid grid-flow-col gap-2 mt-4'>
                            <div className='grid-col-5'>
                                <Label htmlFor='username' className='font-bold' value='Usuario' />
                                <TextInput type="text" placeholder="username" id="username" name="username"
                                    value={formik.values.username}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    helperText={
                                        formik.touched.username &&
                                        formik.errors.username && (
                                            <span className="text-red-600">{formik.errors.username}</span>
                                        )
                                    } />
                            </div>
                            <div className='grid-col-7'>
                                <Label htmlFor='roles' className='font-bold' value='roles' />
                                <Select id="role" name="roles" >
                                    <option value='1'>Admin</option>
                                    <option value='2'>User</option>
                                    <option value='3'>Cliente</option>
                                </Select>
                            </div>

                        </div>
                        <div className='grid grid-flow-col gap-2 mb-4'>
                            <div className='grid-col-6'>
                                <Label htmlFor='password' className='font-bold' value='Contraseña' />
                                <TextInput type='password' placeholder="************" id="password" name="password"
                                    value={formik.values.password}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    helperText={
                                        formik.touched.password &&
                                        formik.errors.password && (
                                            <span className="text-red-600">{formik.errors.password}</span>
                                        )
                                    } />
                            </div>
                            <div className='grid-col-6'>
                                <Label htmlFor='confirmPassword' className='font-bold' value='Confirmar contraseña' />
                                <TextInput type='password' placeholder="************" id="confirmPassword" name="confirmPassword"
                                    value={formik.values.confirmPassword}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    helperText={
                                        formik.touched.confirmPassword &&
                                        formik.errors.confirmPassword && (
                                            <span className="text-red-600">{formik.errors.confirmPassword}</span>
                                        )
                                    } />
                            </div>
                        </div>
                        <div className='grid grid-flow-col gap-2 mb-4'>
                            <div className='grid-col-5'>
                                <Label htmlFor='avatar' className='font-bold' value='Avatar' />
                                <TextInput type='file' id="avatar" name="avatar"
                                    onChange={(e) => handleChangeAvatar(e)}
                                />
                            </div>
                        </div>
                        <h3 className='font-bold text-2xl'>Datos personales</h3>
                        <div className='grid grid-flow-col gap-2 mt-4'>
                            <div className='grid-col-4'>
                                <Label htmlFor='name' className='font-bold' value='Nombre' />
                                <TextInput type="text" placeholder="Anett Yomali" id="name" name="name"
                                    value={formik.values.name}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    helperText={
                                        formik.touched.name &&
                                        formik.errors.name && (
                                            <span className="text-red-600">{formik.errors.confirmPassword}</span>
                                        )
                                    } />
                            </div>
                            <div className='grid-col-4'>
                                <Label htmlFor='surname' className='font-bold' value='Apellido materno' />
                                <TextInput type="text" placeholder="Vera" id="surname" name="surname"
                                    value={formik.values.surname}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    helperText={
                                        formik.touched.surname &&
                                        formik.errors.surname && (
                                            <span className='text-red-600'>{formik.errors.surname}</span>
                                        )
                                    }
                                />
                            </div>
                            <div className='grid-col-4'>
                                <Label htmlFor='lastname' className='font-bold' value='Apellido paterno' />
                                <TextInput type="text" placeholder="Carbajal" id="lastname" name="lastname"
                                    value={formik.values.lastname}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    helperText={
                                        formik.touched.lastname &&
                                        formik.errors.lastname && (
                                            <span className='text-red-600'>{formik.errors.lastname}</span>
                                        )
                                    } />
                            </div>
                        </div>
                        <div className='grid grid-flow-col gap-2'>
                            <div className='grid-col-6'>
                                <Label htmlFor='curp' className='font-bold' value='CURP' />
                                <TextInput type='curp' placeholder="VECA040828MBCRRNA6" id="curp" name="curp"
                                    value={formik.values.curp}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    helperText={
                                        formik.touched.curp &&
                                        formik.errors.curp && (
                                            <span className='text-red-600'>{formik.errors.curp}</span>
                                        )
                                    }
                                />
                            </div>
                            <div className='grid-col-6'>
                                <Label htmlFor='birthdate' className='font-bold' value='Fecha de nacimiento' />
                                <TextInput
                                    type='date'
                                    title="Fecha de nacimiento"
                                    id='birthdate'
                                    name='birthdate'
                                    value={formik.values.birthdate}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    helperText={
                                        formik.touched.birthdate &&
                                        formik.errors.birthdate && (
                                            <span className='text-red-600'>{formik.errors.curp}</span>
                                        )
                                    } />
                            </div>
                        </div>
                    </div>
                </form>
            </Modal.Body>
            <Modal.Footer className='flex justify-end gap-2'>
                <Button onClick={() => closeModal()}>CANCELAR</Button>
                <Button
                    type='submit'
                    form='userForm'
                    disabled={formik.isSubmitting || !formik.isValid}
                    color='succes'>
                    GUARDAR
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default RegisterUserForm