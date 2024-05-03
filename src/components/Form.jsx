

const Form = () => {
    const handleSubmit = (e) => {
        e.preventDefault()
        const {name, email, phone} = e.target
        const formData = {
            name: name.value,
            email: email.value,
            phone: phone.value
        }
        console.log(formData)

        fetch('http://localhost:5000/add', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        })
        .then((res) => res.json())
        .then((data) => {
            e.target.reset()
            console.log(data)
        })
        .catch((err) => console.log(err))
    }
  return (
    <div className="w-full h-screen flex items-center justify-center">
        <form onSubmit={handleSubmit} className="flex flex-col items-center justify-center bg-slate-500 w-max m-auto gap-2 p-5">
        <input className="border border-black" placeholder="Enter your name" type="text" name="name" />
        <input className="border border-black" placeholder="Enter your Email" type="text" name="email" />
        <input className="border border-black" placeholder="Enter your phone" type="text" name="phone" />
        <input className="py-2 px-5 cursor-pointer bg-blue-500" type="submit" value="Submit" />
    </form>
    </div>
  )
}

export default Form