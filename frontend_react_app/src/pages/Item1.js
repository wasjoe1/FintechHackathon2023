import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Item1 = () => {
  const [itemDetails, setItemDetails] = useState({})
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    getDetails()
  }, [])

  const getDetails = async () => {
    try{
      const response = await fetch('http://172.20.10.2:80/buyItem')
      const data = await response.json()
      setItemDetails(data);
      console.log('this is data: ', data)
    }
    catch(error){
      console.error(error)
    }
  }

  const payNow = async () => {
    try{
      setLoading(true)
      setError(null)
      const response = await fetch('http://172.20.10.2:80/payForItem',{
        method: 'POST',
        body: JSON.stringify({
          title: "foo",
          body: "bar",
          userId: 1
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
      })
      const data = await response.json()
      console.log("RIGHT HERE: ", data)
      setLoading(false)
      if('error' in data){
        setError(data.error)
      }
      else{
        navigate('/success', {state: {link: data.link}})
      }
    }
    catch(error){
      setLoading(false)
      setError(error.message)
      console.error(error)
    }
  }

  return (
      <div className='main-container'>
          <div className='big-card'>
            <img className='panda-logo' src='https://www.panda-bank.com/assets/images/logo.svg'/>
            {/* {loading ? <img style={{width:'30px', height: '30px'}} src='https://www.citypng.com/public/uploads/preview/loading-load-icon-transparent-png-11639609114lctjenyas8.png'/> : <Details/>} */}
            <div className='item-title'>
              {itemDetails['item_name']}
            </div>

            <img className='item-img' src={itemDetails['imageLink']}/>

            <img className='company-logo' src='https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/National_Gallery_Singapore_logo.svg/2560px-National_Gallery_Singapore_logo.svg.png'/>

            <div className='description'>
              <div className='seller-info'>
                <div className='container1'>
                  <div className='smaller-container1'>
                    <img className='profile-pic' src='https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Default_pfp.svg/1200px-Default_pfp.svg.png'/>
                    <div style={{marginLeft: '1rem'}}>{itemDetails['username']}</div>
                  </div>
                </div>
                <div className='container2'>
                  {/* <div className='verified-section'>
                    <img className='country-icon' src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRByk1KAxzJ_Lme0c6gO5etuKjZeaSsx-z0TfMMdCDgGg9kY9e_YMl7JcgKLMDnDUwonWw&usqp=CAU'></img>
                    <div className='country'>China</div>
                  </div> */}
                  <div className='verified-section'>
                    <img className='verified' src='https://cdn-icons-png.flaticon.com/512/6364/6364343.png'/>
                    <div className='verified-text'>
                      Verified
                    </div>
                  </div>
                </div>
              </div>

              <div className='item-info'>
                <div className='info-tab'>
                  <div className='label'>
                    Condition
                  </div>
                  <div className='desc'>
                    {itemDetails['condition']}
                  </div>
                </div>
                <div className='info-tab'>
                  <div className='label'>
                    Material
                  </div>
                  <div className='desc'>
                    {itemDetails['material']}
                  </div>
                </div>
                <div className='info-tab'>
                  <div className='label'>
                    Category
                  </div>
                  <div className='desc'>
                    {itemDetails['category']}
                  </div>
                </div>
                <div className='info-tab'>
                  <div className='label'>
                    Item ID
                  </div>
                  <div className='desc'>
                    {itemDetails['item_id']}
                  </div>
                </div>
              </div>
            </div>

            <div className='item-price'>
              ${itemDetails['item_price']}
            </div>
            {error ? <div className='error-message'>
              {error}
            </div>
            : <></>
            }
            {
              loading ? <div className='loading-btn'>Loading...</div>
              : <div className='pay-btns'>
                <div className='pay-btn' onClick={payNow}>PAY</div>
                <div className='pay-btn' onClick={payNow}><img className='pay-logo' src='https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/Mastercard_2019_logo.svg/800px-Mastercard_2019_logo.svg.png'/></div>
                <div className='pay-btn' onClick={payNow}><img className='pay-logo' src='https://www.nicepng.com/png/full/235-2355602_apple-pay-with-stripe-apple-pay-logo-white.png'/></div>
              </div>
            }
            
          </div>
      </div>
    )
}

export default Item1