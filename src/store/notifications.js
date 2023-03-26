// import {createSlice} from '@reduxjs/toolkit';

// const initialState = {
//     extraItems :[],
    
// }

// export const extraSlice = createSlice({
//   name: 'extra',
//   initialState,
// 	reducers :{
// 		addExtra(state ,action){
// 			const newItem = action.payload;
// 			const existingItem = state.extraItems.find(((item)=> item.id === newItem.id && item.type === newItem.id))
// 			newItem.quantity++
// 			if(!existingItem){
// 				state.extraItems.push(newItem)
// 			}
// 			else{
// 				existingItem.quantity++
// 			}
			
// 		},
//     decreaseExtra(state ,action){
// 			const id = action.payload;
			
// 			const existingItem = state.extraItems.find((item)=> item.id === id)
// 			if(existingItem.quantity === 1){
// 				state.extraItems = state.extraItems.filter((item)=>item.id !== id)
// 				// newItem.quantity--
// 			}
// 			else{
// 				existingItem.quantity--
// 				//existingItem.totalPrice = Number(existingItem.totalPrice) - Number(existingItem.price)
// 			}
			
// 		},
//     // removeItem(state ,action){
// 	// 		const id = action.payload;
// 	// 		const existingItem = state.extraItems.find((item)=> item.id === id)
// 	// 		if(existingItem){
// 	// 			state.extraItems = state.cartItems.filter((item)=>item.id !== id)
//     //     state.totalQuantity -= existingItem.quantity
// 	// 		}
			
			
// 	// 	}
// 	}

// })
// export const extraActions = extraSlice.actions

// export default extraSlice.reducer