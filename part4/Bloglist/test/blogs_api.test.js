const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const helper = require('./test_helper')

const api = supertest(app)

beforeEach(async () => {
    await Blog.deleteMany({})

    for (let blog of helper.initialblogs) {
        const blogObject = new Blog(blog)
        await blogObject.save()
    }
})

test('response is in json', async () => {
    await api
        .get('/api/blogs')
        .expect(200)
        .expect('content-type', /application\/json/)
})


test('all initial blogs are saved in the db', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(helper.initialblogs.length)
})

test('unique identifier property of the blog posts is named id', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body[0].id).toBeDefined()
})

test('can make a post', async () => {
    const newBlog = new Blog({
        title: "Making tests is a bore",
        author: "Leyban Lazada",
        url: "http://leybaniskiool.com/",
        likes: 2,
    })
    await newBlog.save()

    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(helper.initialblogs.length + 1)
    expect(response.body.find(blog => blog.title === "Making tests is a bore")).toBeDefined()
})

test('default like is 0', async () => {
    const newBlog = new Blog({
        title: "Making tests is a bore",
        author: "Leyban Lazada",
        url: "http://leybaniskiool.com/"
    })
    await newBlog.save()

    const response = await api.get('/api/blogs')
    expect(response.body.find(blog => blog.title === "Making tests is a bore").likes).toBe(0)
})

test('reject missing title', async () => {
    const titleLessBlog = new Blog({
        author: "Leyban Lazada",
        url: "http://leybaniskiool.com/"
    })
    await api
        .post('/api/blogs')
        .send(titleLessBlog)
        .expect(400)

    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(helper.initialblogs.length)
})

test('reject missing url', async () => {
    const urlLessBlog = new Blog({
        title: "Making tests is a bore",
        author: "Leyban Lazada",
    })
    await api
        .post('/api/blogs')
        .send(urlLessBlog)
        .expect(400)

    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(helper.initialblogs.length)
})

test('delete blog', async () => {
    const response = await api.get('/api/blogs')
    const idToDelete = response.body[0].id
    await api.delete(`/api/blogs/${idToDelete}`)

    const newResponse = await api.get('/api/blogs')
    expect(newResponse.body).toHaveLength(helper.initialblogs.length - 1)
})

test('edit blog post', async () => {
    const response = await api.get('/api/blogs')
    const idToUpdate = response.body[0].id
    const newBlog = {
        title:'This is an Edited Blog',
        author:'None other than yours truly',
        url:'http://notarealwebsite.com/'
    }
    const returnedBlog = await api.put(`/api/blogs/${idToUpdate}`).send(newBlog)
    expect(returnedBlog.body.id).toBe(idToUpdate)
    expect(returnedBlog.body.title).toBe('This is an Edited Blog')
    expect(returnedBlog.body.author).toBe('None other than yours truly')
    expect(returnedBlog.body.url).toBe('http://notarealwebsite.com/')

    const newBloglist = await api.get('/api/blogs')
    expect(newBloglist.body.find(blog=>blog.id===idToUpdate).title)
        .toBe('This is an Edited Blog')
})

afterAll(() => {
    mongoose.connection.close()
})