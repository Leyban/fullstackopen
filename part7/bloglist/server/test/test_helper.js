const Blog = require('../models/blog')

const initialblogs = [
    {
      _id: "5a422a851b54a676234d17f7",
      title: "React patterns",
      author: "Michael Chan",
      url: "https://reactpatterns.com/",
      likes: 7,
      user: "6269f5bd3f78cd2905140e04",
      __v: 0
    },
    {
      _id: "5a422aa71b54a676234d17f8",
      title: "Go To Statement Considered Harmful",
      author: "Edsger W. Dijkstra",
      url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
      likes: 5,
      user: "6269f5bd3f78cd2905140e04",
      __v: 0
    },
    {
      _id: "5a422b3a1b54a676234d17f9",
      title: "Canonical string reduction",
      author: "Edsger W. Dijkstra",
      url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
      likes: 12,
      user: "6269f5bd3f78cd2905140e04",
      __v: 0
    },
    {
      _id: "5a422b891b54a676234d17fa",
      title: "First class tests",
      author: "Robert C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
      likes: 10,
      user: "6269f5bd3f78cd2905140e04",
      __v: 0
    },
    {
      _id: "5a422ba71b54a676234d17fb",
      title: "TDD harms architecture",
      author: "Robert C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
      likes: 0,
      user: "6269f5d43f78cd2905140e07",
      __v: 0
    },
    {
      _id: "5a422bc61b54a676234d17fc",
      title: "Type wars",
      author: "Robert C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
      likes: 2,
      user: "6269f5d43f78cd2905140e07",
      __v: 0
    }  
]

const initialUsers = [
  {
    _id:"6269f5bd3f78cd2905140e04",
    name:"Joseph Joestar",
    username:"jojo",
    passwordHash:"$2b$10$tBAplMmas657BBvLEC/pJ.eTiBuEMR3beUxhnxd/uS7WewNFG6/C2",
    __v:0
  },
  {
    _id:"6269f5d43f78cd2905140e07",
    name:"Mike Wazowski",
    username:"mike",
    passwordHash:"$2b$10$EQH3DkJE/1akdMYQpLlReeMttlR/jdytqaLMGrd.EKNiOCPYk9cNO",
    __v:0
  }
]


module.exports = {
    initialblogs,
    initialUsers
}