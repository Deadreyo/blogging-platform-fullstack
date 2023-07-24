interface Blog {
    _id: string,
    title: string,
    content: string,
    author: {
        _id: string,
        name: string
    },
    createdAt: string,
    __v: number
}