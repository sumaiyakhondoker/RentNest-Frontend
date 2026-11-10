import type { PropertyListResponse } from "@/lib/types";





// get 6 property for home page
export const getHomeProperties = async () => {
  const res = await fetch(
    `${process.env.BACKEND_API_URL}/api/properties?limit=6&page=1`,{
      cache: "no-cache",
        next:{
            revalidate: 60 * 60 * 6,
            tags:["home-properties"]
        }
    }
    
  );

  const result = await res.json();
  console.log('result from geproperties action-------------------', result);
  return result;
};







// //  follow koiro:  all properties get korar time e 
// export const getPremiumNews = async({query}: {query?:{ [key: string]: string | string[] | undefined }})=>{

    
//     // bad approach
//     // const searchTerm =  `${search?.searchTerm ? `?searchTerm=${search.searchTerm}` : ""}`

//     const params = new URLSearchParams()

//     if(query && query.searchTerm){
//         params.set("searchTerm",query.searchTerm as string)
//     }


//     // console.log('params from getPremium news function: ' , params.toString());


//      const cookieStore = await cookies()
//         const accessToken = cookieStore.get("accessToken")?.value || null
    
    
    
//         if(!accessToken){
      
//             return {
//                 success:false,
//                 message: 'You are not logged in. Please login at first'
//             }
//         }


//     const res = await fetch(`${process.env.BACKEND_API_URL}/api/premium?${params.toString()}`, {
//         cache: "no-cache",
//         next:{
//             revalidate: 60 * 60 * 6,
//             tags:["premium-posts"]
//         }
//     })

//     const result = await res.json()
//     return result;

// }






// type PropertyQuery = {
//   [key: string]: string | string[] | undefined;
// };


// type GetPropertiesOptions = {
//   query?: PropertyQuery;
// };

// // getting all properties
// export const getAllProperties = async ({
//   query = {},
// }: GetPropertiesOptions = {}): Promise<PropertyListResponse> => {
//   const params = new URLSearchParams({
//     limit: "10",
//     page: "1",
//   });

//   Object.entries(query).forEach(([key, value]) => {
//     if (value === undefined || value === "") return;

//     params.set(
//       key,
//       Array.isArray(value) ? value.join(",") : value,
//     );
//   });

//   const response = await fetch(
//     `${process.env.BACKEND_API_URL}/api/properties?${params.toString()}`,
//     { cache: "no-store" },
//   );

//   const result: PropertyListResponse = await response.json();

//   if (!response.ok || !result.success) {
//     throw new Error(result.message || "Failed to fetch properties.");
//   }

//   return result;
// };

