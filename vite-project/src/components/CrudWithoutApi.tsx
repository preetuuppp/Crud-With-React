import { useState } from 'react'

type FormDataType = {
    name: string,
    email: string
}


function CrudWithoutApi() {
    const [formData, setFormData] = useState<FormDataType>({
        name: '',
        email: ''
    })
    const [data, setData] = useState<FormDataType[]>([]);
    const [isEdit, setIsEdit] = useState<boolean>(false)
    const [isEditIndex, setIsEditIndex] = useState<number>(0)


    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if (isEdit && isEditIndex != null) {
            const updatedData = data.map((item, index) =>
                index === isEditIndex ? { name: formData.name, email: formData.email } : item
            )
            setData(updatedData)
        } else {
            setData([...data, { name: formData.name, email: formData.email }])

        }

        setIsEdit(false)
        setFormData({
            name: '',
            email: ''
        })
    }


    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target

        setFormData({
            ...formData,
            [name]: value
        })
    }

    const handleDelete = (name: string): void => {
        if (window.confirm('are you sure to delete this')) {
            const delData = data.filter(item => item.name != name)
            setData(delData)
        }
    }

    const handleEdit = (index: number): void => {
        setIsEdit(true)
        setIsEditIndex(index)
        setFormData(data[index])
    }

    return (
        <>
            <form onSubmit={handleSubmit}>

                <input type="text" onChange={handleChange} name='name' value={formData.name} />
                <input type="email" onChange={handleChange} name='email' value={formData.email} />
                <button type='submit'>{isEdit ? "Update" : "Submit"}</button>
            </form>

            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Actions</th>
                    </tr>

                </thead>

                <tbody>
                    {data.map((e, index) => {
                        return (
                            <tr key={index} >
                                <td>Name:{e.name}</td>
                                <td>Email:{e.email}</td>
                                <td>
                                    <button onClick={() => handleEdit(index)}>Edit</button>
                                    <button onClick={() => handleDelete(e.name)}>Delete</button>
                                </td>
                            </tr>

                        )

                    })}
                </tbody>

            </table>


        </>
    )
}

export default CrudWithoutApi
