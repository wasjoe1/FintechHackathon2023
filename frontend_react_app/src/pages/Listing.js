import React, { useEffect, useState } from 'react'
import axios from "axios";

const Listing = () => {
    const [images, setImages] = useState([])
    const [imageURLs, setImageURLs] = useState([])
    const [firstname, setFirstname] = useState('')
    const [lastname, setLastname] = useState('')
    const [username, setUsername] = useState('')
    const [valid, setValid] = useState('')
    const [itemname, setItemname] = useState('')
    const [itemprice, setItemprice] = useState(0)
    const [quantity, setQuantity] = useState(0)
    const [days, setDays] = useState(0)
    const [condition, setCondition] = useState('')
    const [material, setMaterial] = useState('')
    const [category, setCategory] = useState('')
    const [cost, setCost] = useState(1.5)
    const [consignment, setConsignment] = useState(35)

    const UploadImages = () => {
        useEffect(() => {
            if(images.length < 1) return;
            const newImageURLs = []
            images.forEach(image => newImageURLs.push(URL.createObjectURL(image)))
            // setImageURLs(newImageURLs)
            console.log(images)
        }, [images])
    
        const onImageChange = (e) => {
            setImages([...e.target.files])
        }
    
        return(
            <div className='upload-div'>
                <input className='input-img' type='file' multiple accepts='images/*' onChange={onImageChange}/>
                {images.map(imageSrc => <img className='preview-img' src={URL.createObjectURL(images[0])}/>)}
            </div>
        )
    }

    const handleSubmit = async (event) => {
        console.log('this is uploaded thumbnail', images[0])
        event.preventDefault()
        const formData = new FormData();
            formData.append("image", images[0]);
            formData.append("first_name", firstname);
            formData.append("last_name", lastname);
            formData.append("username", username);
            formData.append("valid", valid);
            formData.append("item_name", itemname);
            formData.append("item_price", itemprice);
            formData.append("quantity", quantity);
            formData.append("rental_cost", cost);
            formData.append("rental_days", days);
            formData.append("cosignment", consignment);
            formData.append("condition", condition);
            formData.append("material", material);
            formData.append("category", category);
            formData.append("merchant", 'National Gallery Singapore');
            formData.append("item_id", Math.floor(Math.random()*90000) + 10000);
        console.log(formData)
            
        try {
            const response = await axios({
            method: "post",
            url: "http://172.20.10.2:80/putNewItem",
            data: formData,
            headers: { "Content-Type": "multipart/form-data" },
            });
            window.location.reload(false)
            console.log(response.data)
        } catch(error) {
            console.log(error)
        }
    }

    return (
        <div className='main-container'>
            <div className='big-card'>
                <img className='panda-logo' src='https://www.panda-bank.com/assets/images/logo.svg'/>
                <form className='listing-form'>
                    <div className='seller-details'>
                        <div className='section-title'>Seller Details</div>
                        <div className='inner-container'>
                            <div className='left-container'>
                                <div className='input-container'>
                                    <div className='input-text'>First Name</div>
                                    <input className='input-field' name='firstname' onChange={(e) => setFirstname(e.target.value)}/>
                                </div>
                                <div className='input-container'>
                                    <div className='input-text'>Pandabank Username</div>
                                <input className='input-field' name='username' onChange={(e) => setUsername(e.target.value)}/>
                            </div>
                            </div>
                            <div className='right-container'>
                                <div className='input-container'>
                                    <div className='input-text'>Last Name</div>
                                    <input className='input-field' name='lastname' onChange={(e) => setLastname(e.target.value)}/>
                                </div>
                                <div className='input-container'>
                                    <div className='input-text'>Valid Thru</div>
                                <input type='month' className='input-field' name='valid-period' onChange={(e) => setValid(e.target.value)}/>
                            </div>
                            </div>
                        </div>
                    </div>
                    <div className='item-details'>
                        <div className='section-title'>Item Details</div>
                        <div className='inner-container'>
                            <div className='left-container'>
                                <div className='input-container'>
                                    <div className='input-text'>Item Name</div>
                                    <input className='input-field' name='item-name' onChange={(e) => setItemname(e.target.value)}/>
                                </div>
                                <div className='input-container'>
                                    <div className='input-text'>Quantity</div>
                                    <input type='number' className='input-field' name='quantity' onChange={(e) => setQuantity(e.target.value)}/>
                                </div>
                                <div className='input-container'>
                                    <div className='input-text'>Days of Rental</div>
                                    <input type='number' className='input-field' name='rental-days' onChange={(e) => setDays(e.target.value)}/>
                                </div>
                                <div className='input-container'>
                                    <div className='input-text'>Rental Cost (per day)</div>
                                    {/* this should be fixed */}
                                    <input type='number' className='input-field' name='rental-cost' value='1.50' disabled/>
                                </div>
                                <div className='input-container'>
                                    <div className='input-text'>Consignment (%)</div>
                                    {/* this should be fixed */}
                                    <input type='number' className='input-field' name='consignment' value='35' disabled/>
                                </div>
                            </div>
                            <div className='right-container'>
                                <div className='input-container'>
                                    <div className='input-text'>Item Price</div>
                                    <input type='number' className='input-field' name='item-price' onChange={(e) => setItemprice(e.target.value)}/>
                                </div>
                                
                                <div className='input-container'>
                                    <div className='input-text'>Condition</div>
                                    <input className='input-field' name='condition' onChange={(e) => setCondition(e.target.value)}/>
                                </div>
                                <div className='input-container'>
                                    <div className='input-text'>Material</div>
                                    <input className='input-field' name='material' onChange={(e) => setMaterial(e.target.value)}/>
                                </div>
                                <div className='input-container'>
                                    <div className='input-text'>Category</div>
                                    <input className='input-field' name='category' onChange={(e) => setCategory(e.target.value)}/>
                                </div>
                                <div className='input-container'>
                                    <div className='input-text'>Merchant</div>
                                    {/* this should be fixed */}
                                    <input className='input-field' name='Merchant' value='National Art Gallery' disabled/>
                                </div>
                            </div>
                        </div>
                        <div className='input-container'>
                            <div className='input-text'>Upload Image</div>
                        </div>
                        <UploadImages/>

                    </div>
                    <ul className='tnc'>
                        Terms and Conditions
                        <li>
                            Payment structure: Accounts to be credited upon the verification of transaction via smart contract using PandaBank issued PandaTokens
                        </li>
                        <li>
                        Seller would be unable to retract contract upon the confirmation of the order
                        </li>
                        <li>
                        Ownership of the item will legally be under Seller until the item is sold
                        </li>
                        <li>
                        Business day count starts only after the client provides all resources requested. The milestones might extend based on your feedback time
                        </li>
                        <li>
                        In case of rental exceeding days of rental stated, an additional $2.50/day will
                        be billed to the User's account.
                        </li>
                        <li>
                        In the event of non-payment, ownership of the item will be transferred to the
                        merchant and the item will be removed
                        </li>
                    </ul>
                    <button className='submit-btn' type='submit' onClick={handleSubmit}>AGREE AND CONFIRM</button>
                </form>

            </div>
        </div>
  )
}

export default Listing