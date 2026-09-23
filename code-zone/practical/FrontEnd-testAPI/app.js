fetch('http://localhost:3001/api/course')
    .then((res) => res.json())
    .then((data) => {
        console.log(data)
    })