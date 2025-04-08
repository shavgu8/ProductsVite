export type Includes ={
    quantity: number,
    item: string
  };

export type Others ={
    slug:string,
    name: string,
    image: {
          mobile: string,
          tablet: string,
          desktop: string
    }
}

export type Products =  {
    id: string,
    slug: string,
    name: string,
    image: {
      mobile: string,
      tablet: string,
      desktop: string
    },
    category: string,
    categoryImage: {
      mobile: string,
      tablet: string,
      desktop: string
    },
    new: boolean,
    price: number,
    description: string,
    features: string,
    includes:Includes[],
    gallery: {
      first: {
        mobile: string,
        tablet: string,
        desktop: string
      },
      second: {
        mobile: string,
        tablet: string,
        desktop:string
      },
      third: {
        mobile:string,
        tablet: string,
        desktop:string
      }
    },
    others:Others[],
    count?:number,
    newPrice?:number
  }