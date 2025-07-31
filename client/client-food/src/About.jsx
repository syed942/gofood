import React from 'react'
import { Footer } from './Footer'

export const About = () => {
  return (
    <>
     <div className='wrapper'>
      <div className="main">
      <section class=" py-5">
  <div class="row d-flex flex-row align-items-center">
    <div class="col-md-6">
      <h2>About Us</h2>
      <p>
        Welcome to <strong>FoodExpress</strong>, your go-to food delivery platform in Lahore! We partner with top restaurants to bring delicious meals straight to your door.
      </p>
      <p>
        Our mission is to make food ordering simple, fast, and satisfying. Whether you're craving desi food, pizza, or healthy meals — we’ve got you covered.
      </p>
    </div>
    <div class="col-md-6 text-end ">
      <img src="../images/executive.jpeg" alt="Food Delivery" 
      class="img-fluid rounded object-fit-contain w-75" />
    </div>
  </div>
</section>
<section>
<div className=" py-5">
  <h2 className="text-center mb-4">Who We Are</h2>
  <div className="row align-items-center">
    <div className="col-md-6">
      <img src="/images/team.jpeg" alt="Our Team" className="img-fluid rounded shadow w-75" />
    </div>
    <div className="col-md-6">
      <p>
        At <strong>TasteTown</strong>, we believe good food brings people together. Our journey started in the heart of Lahore, aiming to connect hungry souls with the finest eateries in town.
      </p>
      <p>
        With a team of passionate foodies and tech lovers, we make online ordering fast, reliable, and mouth-watering.
      </p>
    </div>
  </div>
</div>

</section>
<section class="bg-light py-5">
  <div class="">
    <h2 class="text-center mb-4">Our Story</h2>
    <p class="lead text-center">
      It all started with a late-night craving...
    </p>
    <p>
      We launched <strong>BiteNow</strong> in 2021 to fix food delivery delays and limited choices in Lahore. Our mission? Make good food accessible — fast.
    </p>
    <p>
      Today, we're proud to serve thousands of customers daily, helping them explore local flavors and satisfy every craving with just a few taps.
    </p>
  </div>
</section>


      

      </div>
      </div>
      <Footer />
    </>
   
  )
}
