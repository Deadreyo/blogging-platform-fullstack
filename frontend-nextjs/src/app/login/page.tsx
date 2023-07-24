"use client"

import Register from '@/Components/auth/Register'
import Login from '@/Components/auth/Login'
import { Container } from 'react-bootstrap'

export default function () {

    return (
        <Container>
          <Login />
          <hr />
          <Register />
        </Container>
    )
}