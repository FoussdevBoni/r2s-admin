export const getPrice0 = (distance) => {
  let price = {simple:0, both:0}
  if (distance >= 0 && distance <8 ) {
    price.simple = 15000;
    price.both = 19000;
  } else if (distance === 8 ) {
    price.simple = 17500;
    price.both = 21000;
  } else if (distance === 9) {
    price.simple = 17500;
    price.both = 23000;
  } else if (distance === 10) {
    price.simple = 17500;
    price.both = 25000;
  } else if (distance > 10 ) {
    price.simple = 15000 *distance/7;
    price.both = 25000 *distance/10;
  } 
  return price;
};


export const getPrice = (serviceType , distance , places=1)=>{
  const  distanceRef = 7;
  const priceRef = 875*2;
  const prixReel = 875*2*distance/7

   const ecart = Math.abs((prixReel - priceRef))
  
  if (serviceType==='Minicom') {
    
  if (distance===distanceRef) {
      return priceRef*places
  }else if(distance > distanceRef){
       
      return (prixReel -  0.9*ecart)*places
      
  }else if (distance < distanceRef) {
       return (prixReel + 0.2*ecart)*places

  }
  }else if (serviceType==='Privé') {
    
  if (distance===distanceRef) {
      return priceRef
  }else if(distance > distanceRef){
       
      return prixReel + 0.4*ecart
      
  }else if (distance < distanceRef) {
       return prixReel + 0.2*ecart

  }
  } 
}
