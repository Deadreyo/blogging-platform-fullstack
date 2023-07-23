"use client"

import BlogCard from '@/Components/blogs/BlogCard'
import Image from 'next/image'
import Link from 'next/link'
import { Button, Col, Container, Row } from 'react-bootstrap'

export default function Home() {
  return (
    <Container>
      <div className='flex gap-x-5 mt-3 items-center'>
        <h1>Featured Blogs</h1>
        <Link href="./blogs/create">
          <Button>Create</Button>
        </Link>
      </div>
      <Row className='m-auto w-7/8 max-w-5xl'>
        <Col>
          <BlogCard />
          <BlogCard />
          <BlogCard />
          <BlogCard />
        </Col>
      </Row>
    </Container>
  )
}
