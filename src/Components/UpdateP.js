import { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"



export default function UpdateP() {

    const [Name, SetName] = useState(null)
    const [Price, SetPrice] = useState(null)
    const [Category, SCategory] = useState(null)
    let navigate = useNavigate()
    const param = useParams()
    useEffect(() => {
        // const param=useParams()
        console.warn(param);
        getData()
    }, [])

    const getData = async() => {
        let data = await fetch(`http://127.0.0.1:4500/Product/${param.id}`,
        {
            headers:{ authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`}
        })
        data = await data.json()
        console.warn(data);
        SetName(data.Name)
        SetPrice(data.Price)
        SCategory(data.Category)
    }


    const Submit = async () => {
        // console.log(name,Number,fname);

        try {
            let data = await fetch(`http://127.0.0.1:4500/Product/${param.id}`, {
                method: 'PUT',
                body: JSON.stringify({ Name, Price, Category }),
                headers: { 'Content-Type': 'application/json' ,
                    authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`}

            });
            data = await data.json();
            // data =await JSON.stringify(data)
            console.warn(data);

            if (data.modifiedCount>0) {
                alert("Product updated Succesfully")
                navigate('/Prodt')
                // localStorage.setItem('user',JSON.stringify(data.result))
                // localStorage.setItem('token',JSON.stringify(data.auth))
            }
            else {
                alert('Product is not Updated')
                navigate('/Prodt')
            }
        }
        catch (error) {
            console.error('There was a problem with your fetch operation:', error);
        }
    }



    return (
        <>
            <div >
                <h1 style={{ "text-align": "center" }}>Update Product</h1>
            </div>

            <div>
                <input type="text" placeholder="Enter New Product Name " value={Name} onChange={(e) => { SetName(e.target.value) }} className="SignUp" required />
                <input type="Number" placeholder="Enter New Product Price" value={Price} onChange={(e) => { SetPrice(e.target.value) }} className="SignUp" required />
                <input type="text" placeholder="Enter New Product Category "  value={Category} onChange={(e) => { SCategory(e.target.value) }} className="SignUp" required />
                <button onClick={Submit} className="button">Update-Product</button>
            </div>
        </>


    )
}