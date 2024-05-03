import { useEffect, useState } from "react"


function App() {

  const [data, setData] = useState()
  const [checkData, setCheckData] = useState([])
  const [checkAll, setCheckAll] = useState(true)
  const [render, setRender] = useState(false)

  useEffect(() => {
    fetch('http://localhost:5000/get')
     .then(res => res.json())
     .then(item => {
        setData(item)
      })
      .catch((err) => console.log(err))
  },[render])

  const handleCheckAll = () => {
    // setCheck(e.target.checked)
    setCheckAll(!checkAll)
    if(checkAll){
      setCheckData(data.map((item) => item?._id))
    }else{
      setCheckData([])
    }
  }

  const handleCheck = (id) => {
    if(checkData.includes(id)){
      setCheckData(checkData.filter(item => item!== id))
    }else{
      setCheckData([...checkData, id])
    }
  }
  console.log(checkData)

  const handleDelete = (e) => {
    e.preventDefault()
    console.log(checkData)
    fetch('http://localhost:5000/delete',{
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(checkData)
    })
     .then((res) => res.json())
     .then((data) => {
        console.log(data)
        setRender(!render)
      })
      .catch((err) => console.log(err))
  }
  return (
    <>
      <table className="w-full text-center">
        <thead>
          <tr>
            <th><input type="checkbox" onChange={handleCheckAll} /></th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((item) => <tr key={item?._id}>
            <td><input type="checkbox" checked={checkData.includes(item?._id)} onChange={() =>handleCheck(item?._id)} /></td>
            <td>{item.name}</td>
            <td>{item.email}</td>
            <td>{item.phone}</td>
          </tr>)}
        </tbody>
      </table>
      <button onClick={handleDelete}>Delete</button>
    </>
  )
}

export default App
