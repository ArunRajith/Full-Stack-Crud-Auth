import React, { useEffect, useState } from 'react'
import { FaUser } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { register, reset } from '../features/auth/authSlice'
import { Spinner } from '../components/Spinner'

export const Register = () => {

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        password2: '',
    })

    const { name, email, password, password2 } = formData

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const { user, isError, isLoading, isSuccess, message } = useSelector(
        (state) => state.auth
    )

    useEffect(() => {
        if (isError) {
            toast.error(message)
        }

        if (isSuccess && user) {
            navigate('/')
        }

        dispatch(reset())
    }, [user, isError, isSuccess, message, navigate, dispatch])

    const onChange = (e) => {
        setFormData((prev) => ({
            ...prev, [e.target.name]: e.target.value
        }))
    }

    const onSubmit = (e) => {
        e.preventDefault()

        if (password !== password2) {
            toast.error("password is not matching")
        } else {
            const userData = {
                username: name,
                email,
                password
            };
            dispatch(register(userData))
        }
    }

    if (isLoading) {
        return <Spinner />
    }

    return (
        <>
            <section className='heading'>
                <h1>
                    <FaUser />
                    Register
                </h1>
                <p>Please create an account</p>
            </section>
            <section className='form'>
                <form onSubmit={onSubmit}>
                    <div className='form-group'>
                        <input type="text" name="name" id="name" value={name} placeholder='Please enter name' className='form-control' onChange={onChange} />
                        <input type="email" name="email" id="email" value={email} placeholder='Please enter email' className='form-control' onChange={onChange} />
                        <input type="password" name="password" id="password" value={password} placeholder='Please enter password' className='form-control' onChange={onChange} />
                        <input
                            type="password"
                            name="password2"
                            id="password2"
                            value={password2}
                            placeholder="Please confirm password"
                            className="form-control"
                            onChange={onChange}
                        />

                    </div>
                    <div className='form-group'>
                        <button type='submit' className='btn btn-block'>Submit</button>
                    </div>
                </form>
            </section>
        </>
    )
}
