import { Link } from "react-router-dom";
import { connect } from "react-redux";
import React from 'react'
import { RatingStar } from "rating-star"

import { toyService } from '../services/toy.service.js'
import { NicePopup } from '../cmps/nice-popup.jsx'
import { ToyReview } from '../cmps/toy-review.jsx'
import { ChatApp } from '../pages/chat-app.jsx'
import { updateUser } from '../store/actions/user.action.js'
import { setToy } from '../store/actions/toy.action.js'

class _ToyDetails extends React.Component {

   state = {
      toy: '',
      isModalOpen: false
   }

   componentDidMount() {
      const { toyId } = this.props.match.params
      toyService.getById(toyId)
         .then(toy => {
            this.setState({ toy }, () => {
               this.props.setToy(toy)
            })
         })
      document.addEventListener("keydown", this.escFunction, false);
   }

   componentWillUnmount() {
      document.removeEventListener("keydown", this.escFunction, false);
   }

   escFunction = (event) => {
      if (event.key === "Escape") {
         this.setState({ isModalOpen: false })
      }
   }

   onAddToCart = () => {
      const { toy } = this.state
      const { user } = this.props
      const updatingUser = user
      updatingUser.cart.push({ _id: toy._id, name: toy.name, price: toy.price, qty: 1 })
      console.log('onAddToCart', updatingUser);
      this.props.updateUser(updatingUser)
   }

   onOpenModal = () => {
      this.setState({ isModalOpen: !this.state.isModalOpen })
   }

   onClose = () => {
      this.setState({ isModalOpen: false })
   }

   render() {
      const { toy, isModalOpen } = this.state
      const { user, reviews } = this.props

      const lastReviewAdded = reviews[reviews.length - 1]?.aboutToy
      const matchReviews = lastReviewAdded && reviews.filter(review => review.aboutToy._id === toy._id)
      const countReviews = lastReviewAdded && matchReviews.length
      const avg = lastReviewAdded && matchReviews.reduce((acc, crr) => acc + +crr.star, 0) / countReviews

      if (!toy) return
      const options = {
         day: "2-digit",
         month: "2-digit",
         year: "2-digit",
         hour: "2-digit",
         minute: "2-digit",
         hour12: false,
         timeZone: "UTC",
      }
      const dateFormat = new Intl.DateTimeFormat('en-GB', options).format(toy.createdAt)
      const stock = toy.inStock ? 'In stock 🟢' : 'Out of stock 🔴'
      const hidePopup = isModalOpen ? 'hide' : ''
      const isImgUrl = typeof toy.img === 'string' ? true : false

      return (
         <div>
            <main>
               <div className="details-container">

                  <div className="details-img">
                     {!isImgUrl && <img src={`http://res.cloudinary.com/dfmhvgff2/image/upload/${toy.img}.png`} />}
                     {isImgUrl && <img src={toy.img} />}
                  </div>

                  <div className="details-info">
                     <div className="details-btn" >
                        <Link to={`/toy`}>Back</Link>
                        {user && (user.isAdmin && <Link to={`/toy/edit/${toy._id}`}>Edit</Link>)}
                     </div>

                     <p className="details-title" >{toy.name}</p>
                     <div className="details-review-count" >({countReviews} customer reviews) <RatingStar id="non-clickable" rating={avg} /></div>
                     <p className="details-date" >{dateFormat}</p>
                     <p className="details-stock">{stock}</p>
                     <p className="details-price" >${toy.price}</p>
                     <p className="details-description" >Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ipsa, quisquam mollitia. Aperiam architecto qui sed, totam quos ipsam quidem a maiores odio nemo aut eligendi delectus velit recusandae fugiat quod?</p>
                     <p className="details-labels" >Labels: {toy.labels.map(label => ` ${label}, `)}</p>
                     <button className="details-add-cart" onClick={() => { this.onAddToCart() }} >ADD TO CART</button>
                  </div>

               </div>

               <button className={`open-nice-popup ${hidePopup}`} onClick={this.onOpenModal} >💬</button>
               {isModalOpen &&
                  <NicePopup onClose={this.onClose}>
                     <ChatApp />
                  </NicePopup>}

               <div className="review-container">
                  <div className="review-header">Toy Reviews</div>
                  <ToyReview />
               </div>
            </main>
         </div>
      )
   }
}

const mapStateToProps = (storeState) => {
   return {
      user: storeState.userModule.user,
      reviews: storeState.reviewModule.reviews
   }
}

const mapDispatchToProps = {
   updateUser,
   setToy
}

export const ToyDetails = connect(
   mapStateToProps,
   mapDispatchToProps
)(_ToyDetails)


// import { Link } from "react-router-dom";
// import { connect } from "react-redux";
// import React from 'react'

// import { toyService } from '../services/toy.service.js'
// import { NicePopup } from '../cmps/nice-popup.jsx'
// import { ToyReview } from '../cmps/toy-review.jsx'
// import { ChatApp } from '../pages/chat-app.jsx'
// import { addToCart } from '../store/actions/user.action.js'
// import { setToy } from '../store/actions/toy.action.js'

// class _ToyDetails extends React.Component {

//    state = {
//       toy: '',
//       isModalOpen: false
//    }

//    componentDidMount() {
//       const { toyId } = this.props.match.params
//       toyService.getById(toyId)
//          .then(toy => {
//             this.setState({ toy }, () => {
//                this.props.setToy(toy)
//             })
//          })
//       document.addEventListener("keydown", this.escFunction, false);
//    }

//    componentWillUnmount() {
//       document.removeEventListener("keydown", this.escFunction, false);
//    }

//    escFunction = (event) => {
//       if (event.key === "Escape") {
//          this.setState({ isModalOpen: false })
//       }
//    }

//    onAddToCart = () => {
//       const { toy } = this.state
//       this.props.addToCart({ _id: toy._id, name: toy.name, price: toy.price, qty: 1 })
//    }

//    onOpenModal = () => {
//       this.setState({ isModalOpen: !this.state.isModalOpen })
//    }

//    onClose = () => {
//       this.setState({ isModalOpen: false })
//    }

//    render() {
//       const { toy, isModalOpen } = this.state
//       const { user, reviews } = this.props

//       const lastReviewAdded = reviews[reviews.length - 1]?.aboutToy
//       const countReviews = lastReviewAdded && reviews.filter(review => review.aboutToy._id === toy._id).length

//       if (!toy) return
//       const options = {
//          day: "2-digit",
//          month: "2-digit",
//          year: "2-digit",
//          hour: "2-digit",
//          minute: "2-digit",
//          hour12: false,
//          timeZone: "UTC",
//       }
//       const dateFormat = new Intl.DateTimeFormat('en-GB', options).format(toy.createdAt)
//       const stock = toy.inStock ? 'In stock 🟢' : 'Out of stock 🔴'
//       const hidePopup = isModalOpen ? 'hide' : ''

//       return (
//          <div>
//             <main>
//                <div className="details-container">

//                   <div className="details-img">
//                      <img src={require(`../assets/img/toys/toy${toy.img}.png`)} />
//                   </div>

//                   <div className="details-info">
//                      <div className="details-btn" >
//                         <Link to={`/toy`}>Back</Link>
//                         {user && (user.isAdmin && <Link to={`/toy/edit/${toy._id}`}>Edit</Link>)}
//                      </div>

//                      <p className="details-title" >{toy.name}</p>
//                      <p className="details-review-count" >({countReviews} customer reviews) ⭐️⭐️⭐️⭐️⭐️</p>
//                      <p className="details-date" >{dateFormat}</p>
//                      <p className="details-stock">{stock}</p>
//                      <p className="details-price" >${toy.price}</p>
//                      <p className="details-description" >Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ipsa, quisquam mollitia. Aperiam architecto qui sed, totam quos ipsam quidem a maiores odio nemo aut eligendi delectus velit recusandae fugiat quod?</p>
//                      <p className="details-labels" >Labels: {toy.labels.map(label => ` ${label}, `)}</p>
//                      <button className="details-add-cart" onClick={() => { this.onAddToCart() }} >ADD TO CART</button>
//                   </div>

//                </div>

//                <button className={`open-nice-popup ${hidePopup}`} onClick={this.onOpenModal} >💬</button>
//                {isModalOpen &&
//                   <NicePopup onClose={this.onClose}>
//                      <ChatApp />
//                   </NicePopup>}

//                <div className="review-header">Toy Reviews</div>
//                <ToyReview />
//             </main>
//          </div>
//       )
//    }
// }

// const mapStateToProps = (storeState) => {
//    return {
//       user: storeState.userModule.user,
//       reviews: storeState.reviewModule.reviews
//    }
// }

// const mapDispatchToProps = {
//    addToCart,
//    setToy
// }

// export const ToyDetails = connect(
//    mapStateToProps,
//    mapDispatchToProps
// )(_ToyDetails)