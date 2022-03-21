import mongodb from "mongodb"

let restaurants

// conexion a la BD en MONGO
export default class RestaurantsDAO {
  static async injectDB(conn) {
    if (restaurants) {
      return
    }
    try {
      restaurants = await conn.db(process.env.RESTREVIEWS_NS).collection("restaurants")
    } catch (e) {
      console.error(
        `Unable to establish a collection handle in restaurantsDAO: ${e}`,
      )
    }
  }


// "cuisine" -- databasefield
static async getRestaurants({
    filters = null,
    page = 0,
    restaurantsPerPage = 20,
} = {}) {
    let query 

    if (filters) {
        if ("name" in filters) {
            query = { $text: { $search: filters["name"]}}
        } else if ("cuisine" in filters) {
            query = {"cuisine": { $eq: filters["cuisine"]}}
        } else if ("zipcode" in filters) {
            query = {"address.zipcode": { $eq: filters["zipcode"]}}   
        }   
    }

let cursor

try{
    // esto ejecuta el query y trae la info de la BD
    cursor = await restaurants
    .find(query)
} catch (e) {
    console.error (`No es posible encontrar la infomración, ${e}`)
    return {restaurantsList: [], totalNumRestaurants: 0 }
}

const displayCursor = cursor.limit(restaurantsPerPage).skip(restaurantsPerPage * page)

try{
    const restaurantsList = await displayCursor.toArray()
    const totalNumRestaurants = await restaurants.countDocuments(query)

    return{restaurantsList, totalNumRestaurants}
} catch (e){
    console.error(
        `No es posible traer la cantidad de documentos, ${e}`,
    )
    return {restaurantsList: [], totalNumRestaurants: 0}
}
}
}
