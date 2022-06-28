import { Link } from "react-router-dom";
import { connect } from "react-redux";
import React from 'react'

import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';

import { removeToy, editToy, addToy } from '../store/actions/toy.action.js'
import { toyService } from '../services/toy.service.js'
import { utilService } from '../services/util.service.js'
import { uploadImg } from '../services/cloudinary.service.js'

class _ToyEdit extends React.Component {

   state = {
      toy: {
         inStock: '',
         price: '',
         createdAt: '',
         labels: [],
         name: '',
         createdAt: Date.now(),
         img: utilService.getRandomIntInclusive(0, 13)
      },
      isNewToy: false
   }

   componentDidMount() {
      const { toyId } = this.props.match.params
      if (toyId === 'new') return this.setState({ isNewToy: true })
      toyService.getById(toyId)
         .then(toy => {
            this.setState({ toy }, () => {
               const date = new Date(toy.createdAt).toISOString().replace(/T.*/, '').split('-').join('-');
               const toyEdit = { ...toy, createdAt: date }
               this.setState({ toy: toyEdit })
            })
         })
   }

   onAddRandomToy = () => {
      const toy = toyService.getEmptyToy();
      this.props.addToy(toy)
   }

   onRemoveToy = (toyId) => {
      this.props.removeToy(toyId)
      this.props.history.push('/toy/')
   }

   onSubmit = (ev) => {
      !!ev && ev.preventDefault()
      const { toy, isNewToy } = this.state

      if (!isNewToy) {
         const toyEdit = { ...toy, createdAt: Date.parse(toy.createdAt)/*, labels: [...new Set(toy.labels.map(obj => obj.value))]*/ }
         console.log(toyEdit);
         this.props.editToy(toyEdit)
         this.props.history.push(`/toy/details/${toy._id}`)
      } else {
         const toyAdd = { ...toy, createdAt: Date.parse(toy.createdAt)/*, labels: [...new Set(toy.labels.map(obj => obj.value))]*/ }
         this.props.addToy(toyAdd)
         this.props.history.push(`/toy`)
      }
   }

   handleChange = ({ target }) => {
      const { name, value } = target
      if (name === 'labels') {
         const { labels } = this.state.toy
         if (!labels.includes(value)) labels.push(value)
      }
      else if (name === 'price') this.setState((prevState) => ({ toy: { ...prevState.toy, [name]: +value } }))
      else this.setState((prevState) => ({ toy: { ...prevState.toy, [name]: value } }))
   }

   // handleChangeSelect = (labels) => {
   //     this.setState((prevState) => ({ toy: { ...prevState.toy, labels } }))
   // }

   onUploadImg = (ev) => {
      uploadImg(ev)
         .then((url) => {
            this.setState((prevState) => ({ toy: { ...prevState.toy, img: url } }))
            console.log('url', url);
         })
   }

   render() {
      const { toy, isNewToy } = this.state
      const { inStock, name, price, createdAt } = this.state.toy
      const isImgUrl = typeof toy.img === 'string' ? true : false
      const title = isNewToy ? 'New toy' : 'Edit toy'
      return (
         <div>
            <main className="edit-container">
               <h3 className="edit-header" >{title}</h3>
               {isNewToy && <button onClick={this.onAddRandomToy} >Generate Random Toy</button>}
               <form onSubmit={this.onSubmit} className="toy-edit-form">

                  <Box sx={{ minWidth: 200 }}>
                     <FormControl fullWidth>
                        <InputLabel id="inStock">Stock</InputLabel>
                        <Select
                           labelId="inStock"
                           id="inStock"
                           value={inStock}
                           label="Stock"
                           onChange={this.handleChange}
                           name="inStock"
                        >
                           <MenuItem value={''}>All</MenuItem>
                           <MenuItem value={true}>In stock</MenuItem>
                           <MenuItem value={false}>Out of stock</MenuItem>
                        </Select>
                     </FormControl>
                  </Box>

                  <Box
                     component="form"
                     sx={{ '& > :not(style)': { m: 1, width: 200 }, }}
                     noValidate
                     autoComplete="off"
                  >
                     <TextField id="outlined-basic" onChange={this.handleChange} value={name} name="name" label="Toy name" variant="outlined" />
                  </Box>

                  <Box
                     component="form"
                     sx={{ '& > :not(style)': { m: 1, width: 200 }, }}
                     noValidate
                     autoComplete="off"
                  >
                     <TextField id="outlined-number" type="number" onChange={this.handleChange} value={price} name="price" label="Toy price" variant="outlined" />
                  </Box>

                  <Box
                     component="form"
                     sx={{ '& > :not(style)': { m: 1, width: 200 }, }}
                     noValidate
                     autoComplete="off"
                  >
                     <TextField id="outlined-date" type="date" onChange={this.handleChange} value={createdAt} name="createdAt" variant="outlined" />
                  </Box>

                  <Box
                     component="form"
                     sx={{ '& > :not(style)': { m: 1, width: 200 }, }}
                     noValidate
                     autoComplete="off"
                  >
                     <TextField id="outlined-file" type="file" onChange={this.onUploadImg} variant="outlined" />
                  </Box>

                  {isNewToy ?
                     <img className="img-edit" src='' alt="" /> :
                     <React.Fragment>
                        {!isImgUrl && <img className="img-edit" src={`http://res.cloudinary.com/dfmhvgff2/image/upload/${toy.img}.png`} />}
                        {isImgUrl && <img className="img-edit" src={toy.img} />}
                     </React.Fragment>
                  }
                  <button type="submit" value="Save" id="" >Save</button>

               </form>
               <div className="edit-btn">
                  {!isNewToy ? <button><Link to={`/toy/details/${toy._id}`}>Back</Link></button>
                     : <button><Link to={`/toy`}>Back</Link></button>}
                  {!isNewToy && <button onClick={() => { this.onRemoveToy(toy._id) }}>Delete</button>}
               </div>

            </main>
         </div>
      )
   }
}

const mapStateToProps = (storeState) => {
   return {
      toys: storeState.toyModule.toys
   }
}

const mapDispatchToProps = {
   removeToy,
   editToy,
   addToy
}

export const ToyEdit = connect(
   mapStateToProps,
   mapDispatchToProps

)(_ToyEdit)
