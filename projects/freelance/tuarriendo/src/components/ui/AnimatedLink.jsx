'use client'

import React, { useState, useEffect } from 'react'
import {motion} from 'framer-motion'

function AnimatedLink({title, aditionalClasses = ""}) {
    const [isHovered, setIsHovered] = useState(false)
    const [pady, setPady] = useState(0)

    // Utiliza useEffect para buscar el valor de py- en las clases adicionales
    useEffect(() => {
        const pyMatch = aditionalClasses.match(/py-(\d+)/)
        if (pyMatch) {
            setPady(parseInt(pyMatch[1], 10)) // convierte el valor a número
        }
    }, [aditionalClasses])

  return (
    <motion.div 
      onMouseEnter={() => setIsHovered(true)} 
      onMouseLeave={() => setIsHovered(false)} 
      className={`relative overflow-hidden cursor-pointer ${aditionalClasses}`}
    >
        <AnimatedWord title={title} animation={letterAnimation} isHovered={isHovered}/>
        <div className={`absolute top-0`}>
            <AnimatedWord title={title} animation={letterAnimationTwo(pady)} isHovered={isHovered}/>
        </div>
    </motion.div>
  )
}

const titleAnimation = {
    rest: {
        transition: {
            staggerChildren: 0.003,
        }
    },
    hover: {
        transition: {
            staggerChildren: 0.003,
        }
    }
}

const letterAnimation = {
    rest: {
        y: 0,
        transition: {
            duration: 0.3,
            ease: [0.6, 0.01, 0.05, 0.95],
        },
    },
    hover: {
        y: -50, // reduce movement to prevent height change
        transition: {
            duration: 0.3,
            ease: [0.6, 0.01, 0.05, 0.95],
            type: "tween"
        }
    }
}

// Modifica letterAnimationTwo para aceptar pady como argumento
const letterAnimationTwo = (pady) => ({
    rest: {
        y: 50, // keep the position consistent with letterAnimation
        transition: {
            duration: 0.3,
            ease: [0.6, 0.01, 0.05, 0.95],
        },
    },
    hover: {
        y: pady * 3,
        transition: {
            duration: 0.3,
            ease: [0.6, 0.01, 0.05, 0.95],
            type: "tween"
        }
    }
})

const AnimatedWord = ({title, animation, isHovered}) => {
    return (
        <motion.span 
            variants={titleAnimation} 
            initial="rest" 
            animate={isHovered ? "hover" : "rest"} 
            className='whitespace-nowrap relative inline-block'
            style={{ lineHeight: '1.5em' }} // consistent line-height
        >
            {title.split("").map((char, i) => 
                char === " " ? (
                    <span key={i}> </span>
                ) : (
                    <motion.span
                        variants={animation}
                        className='relative inline-block whitespace-nowrap'
                        key={i}
                    >
                        {char}
                    </motion.span>
                )
            )}
        </motion.span>
    )
}

export default AnimatedLink
