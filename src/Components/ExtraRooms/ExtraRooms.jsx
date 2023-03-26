// import React, { useState, useContext } from "react";

// const ExtraRooms = () => {

//   return (
//     <div className="room-div row mx-0">
//       <AiOutlinePlusCircle
//         onClick={() => setSubRooms((prev) => [...prev, 0])}
//         className="action-div col-md-1"
//       />

//       <div className="action-div col-md-1">
//         <RiDeleteBin6Line onClick={handleDelete} className="delete-icon" />
//         <span>{data?.date}</span>
//       </div>

//       <div className=" col-md-1">
//         <input type="number" className="form-control" placeholder="Guests" />
//       </div>

//       <div className="col-md-2 col-sm-12">
//         {/* <label className="filter-lable">Room Type</label> */}
//         <SelectInputType
//           defaultValue={data?.roomType}
//           className="input"
//           type="type"
//           isMulti={false}
//           isClearable={true}
//           placeholder="Room Type"
//           options={types.map((type) => ({
//             value: type.id,
//             label: type.name,
//           }))}
//           onChange={handleRoomType}
//         />
//       </div>

//       <div className="col-md-2 col-sm-12">
//         {/* <label className="filter-lable">Room View</label> */}
//         <SelectInputType
//           defaultValue={data?.roomView}
//           className="input"
//           type="view"
//           isMulti={false}
//           isClearable={true}
//           placeholder="Room View"
//           options={views.map((view) => ({
//             value: view.id,
//             label: view.name,
//           }))}
//           // onChange={onChooseProject}
//         />
//       </div>

//       <div className="col-md-2 col-sm-12">
//         {/* <label className="filter-lable">Meal</label> */}
//         <SelectInputType
//           className="input"
//           type="meal"
//           isMulti={false}
//           isClearable={true}
//           placeholder="Meal"
//           options={meals.map((meal) => ({
//             value: meal.id,
//             label: meal.name,
//           }))}
//           // onChange={onChooseProject}
//         />
//       </div>
//       <div className="col-md-2 col-sm-12">
//         {/* <label className="filter-lable">Extras</label> */}
//         <SelectInputType
//           className="input"
//           type="extras"
//           isMulti={true}
//           isClearable={true}
//           placeholder="Extras"
//           options={extras.map((extra) => ({
//             value: extra.id,
//             label: extra.name,
//             isDisabled: extra.isDisabled,
//           }))}
//           // onChange={onChooseProject}
//         />
//       </div>
//       {/* {data?.price !== "" && ( */}
//       <div className="price-div col-md-1 col-sm-12">
//         {editPrice ? (
//           <input
//             type="text"
//             className="price-input"
//             value={newPrice}
//             onChange={(e) => setNewPrice(e.target.value)}
//             onBlur={() => setEditPrice(false)}
//           />
//         ) : (
//           <span>${data?.price}</span>
//         )}

//         <MdModeEditOutline
//           className="edit-icon"
//           onClick={() => setEditPrice(true)}
//         />
//       </div>
//       {/* )} */}

//     </div>
//   );
// };

// export default ExtraRooms;
