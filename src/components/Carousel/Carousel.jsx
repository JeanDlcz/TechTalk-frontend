"use client";

import { Carousel } from "flowbite-react";

export function DefaultCarousel() {
  return (
    <div className="hidden md:block">
      <Carousel className="h-96 top-3 ">
        <img
          alt="img Hot Topic"
          src="https://images.unsplash.com/photo-1696429175928-793a1cdef1d3?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        />
        <img
          alt="img Hot Topic"
          src="https://images.pexels.com/photos/8438918/pexels-photo-8438918.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
        
        />
        <img
          alt="img Hot Topic"
          src="https://i2.wp.com/www.revistamercado.do/wp-content/uploads/2021/08/Mujer-immersa-en-videojuego-con-realidad-virtual.jpg?w=1280&ssl=1"
        />
        <img
          alt="img Hot Topic"
          src="https://images.unsplash.com/photo-1512756290469-ec264b7fbf87?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2253&q=80"
        />
        <img
          alt="img Hot Topic"
          src="https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        />
      </Carousel>
    </div>
  );
}
