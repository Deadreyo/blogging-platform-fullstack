"use client"

import BlogCard from '@/Components/blogs/BlogCard'
import Loading from '@/Components/common/Loading'
import useFetch from '@/hooks/useFetch'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { Button, Col, Container, Row } from 'react-bootstrap'

export default function Home() {

  const { response: blogs, isLoading, error } = useFetch<Blog[]>("/blogs")

  return (
    <Container>
      <div className='flex gap-x-5 mt-3 items-center'>
        <h1>Featured Blogs</h1>
        <Link href="./blogs/create">
          <Button>Create</Button>
        </Link>
      </div>
      <Row className='m-auto w-7/8 max-w-5xl'>
        {
          isLoading ? <Loading />
          :
          error ? <h1>Error</h1>
          :
          <Col>
            {blogs!.map((blog) => (
              <BlogCard key={blog._id} {...blog} />
              ))}
          </Col>
        }
      </Row>
    </Container>
  )
}
