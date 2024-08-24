
import React from 'react'
import './Home.css'
import Product from './Product'

function Home() {
    return (
        <div className='home'>
            <div className='home__container'>
                <img
                    className='home__image'
                    src="https://images-eu.ssl-images-amazon.com/images/G/02/digital/video/merch2016/Hero/Covid19/Generic/GWBleedingHero_ENG_COVIDUPDATE__XSite_1500x600_PV_en-GB._CB428684220_.jpg">
                </img>
                <div className='home__row'>
                    <Product
                        id="64378583"
                        title="The Lean Startup  awarded by anovel of the decade by Aalok yadav"
                        price={29.99}
                        image="https://images-na.ssl-images-amazon.com/images/I/51Zymoq7UnL._AC_SY400_.jpg"
                        rating={3} />
                    <Product
                        id="64366663"
                        title="Leveraging the skills of our qualified team of professionals, we are instrumental in offering a wide range of Sony Bluetooth Speaker."
                        price={339.99}
                        image="https://5.imimg.com/data5/FR/HQ/LM/SELLER-29542680/980x-1000x1000.jpg"
                        rating={4} />
                </div>

                <div className='home__row'>
                    <Product
                        id="64378777"
                        title="Unisex Synthetic Leather Asics Safety Shoes"
                        price={2988.89}
                        image="https://5.imimg.com/data5/SELLER/Default/2023/7/329441213/ON/QP/GD/98305701/asics-safety-shoes-cp-201-1000x1000.jpg"
                        rating={5} />
                    <Product
                        id="64378584"
                        title="Powder Pack Duo Front-loadv"
                        price={19.99}
                        image="https://5.imimg.com/data5/ECOM/Default/2024/5/415182721/JS/EL/XB/7714862/powder-pack-duo-front-load-813775-1000x1000.jpg"
                        rating={4} />
                    <Product
                        id="64376682"
                        title="Philips H1 Diamond Vision Headlight Bulb, 55w, 5000k"
                        price={15.99}
                        image="https://5.imimg.com/data5/ECOM/Default/2023/4/301660533/ES/MC/IM/11134566/12258prc1-e6ca222e-7879-4433-9574-d7a5e0d2e796-1000x1000.jpg"
                        rating={2} />
                </div>

                <div className='home__row'>
                    <Product
                        id="54371182"
                        title="3d Acrylic Mirror Wall Sticker Decoration sajnzs;okvmalkfdmbjvbhjanjcndkalbmskgmbjkdbnkjdnbkzmfsdln"
                        price={8.99}
                        image="https://5.imimg.com/data5/ECOM/Default/2024/7/435983737/WT/XN/DG/226251175/6908220195-1000x1000.jpg"
                        rating={5} />
                </div>


            </div>
        </div>
    )
}

export default Home
