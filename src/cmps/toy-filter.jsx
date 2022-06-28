
import React, { useEffect, useRef, useState } from 'react'

import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import OutlinedInput from '@mui/material/OutlinedInput';
import Chip from '@mui/material/Chip';
import { useTheme } from '@mui/material/styles';

const names = [
   'On wheels',
   'Box game',
   'Art',
   'Baby',
   'Doll',
   'Puzzle',
   'Outdoor'
];

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
   PaperProps: {
      style: {
         maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
         width: 200,
      },
   },
};

function getStyles(name, selectedOption, theme) {
   return {
      fontWeight:
         selectedOption.indexOf(name) === -1
            ? theme.typography.fontWeightRegular
            : theme.typography.fontWeightMedium,
   };
}

// export class ToyFilter extends React.Component {
export function ToyFilter({ currFilter, onFilterBy }) {

   const [filterBy, setFilterBy] = useState({ stock: '', sort: '', name: '', selectedOption: [] })
   const theme = useTheme();
   const [labelName, setLabelName] = React.useState([]);

   useEffect(() => {
      // console.log('currFilter', currFilter);
      if (!currFilter) return
      setFilterBy(currFilter)
   }, [])

   // USE BUILDED HOOT THAT NOT START ON THE FIRST LOAD
   // AND HOW CAN SOLVE NOT SENDING REQ ON EVERY LETTER. DEBOUNCE??
   useEffect(() => {
      // console.log('useEffect');
      onSubmit()
   }, [filterBy])


   const handleChange = ({ target }) => {
      console.log('handleChange', target);
      let { name, value } = target
      setFilterBy((prevState) => ({ ...prevState, [name]: value }))
   }

   const onSubmit = (ev) => {
      !!ev && ev.preventDefault()
      onFilterBy(filterBy)
   }

   return (
      <section>
         <form onSubmit={onSubmit} className="toy-filter-form">

            <Box sx={{ minWidth: 200 }}>
               <FormControl fullWidth>
                  <InputLabel id="stock">Stock</InputLabel>
                  <Select
                     labelId="stock"
                     id="stock"
                     value={filterBy.stock}
                     label="Stock"
                     onChange={handleChange}
                     name="stock"
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
               <TextField id="outlined-basic" onChange={handleChange} value={filterBy.name} name="name" label="Search toy" variant="outlined" />
            </Box>

            <FormControl sx={{ m: 1, width: 200 }}>
               <InputLabel id="selectedOption">Labels</InputLabel>
               <Select
                  labelId="selectedOption"
                  id="selectedOption"
                  name="selectedOption"
                  multiple
                  value={filterBy.selectedOption}
                  onChange={handleChange}
                  input={<OutlinedInput id="selectedOption" label="Label" />}
                  renderValue={(selected) => (
                     <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}> {selected.map((value) => (<Chip key={value} label={value} />))}</Box>
                  )}
                  MenuProps={MenuProps}
               >
                  {names.map((name) => (<MenuItem key={name} value={name} style={getStyles(name, labelName, theme)} > {name} </MenuItem>))}
               </Select>
            </FormControl>

            <Box sx={{ minWidth: 200 }}>
               <FormControl fullWidth>
                  <InputLabel id="sort">Sort</InputLabel>
                  <Select
                     labelId="sort"
                     id="sort"
                     value={filterBy.sort}
                     label="sort"
                     onChange={handleChange}
                     name="sort"
                  >
                     <MenuItem value={'Newest'}>Date: Newest</MenuItem>
                     <MenuItem value={'Oldest'}>Date: Oldest</MenuItem>
                     <MenuItem value={'Higher'}>Price: Higher</MenuItem>
                     <MenuItem value={'Lower'}>Price: Lower</MenuItem>
                  </Select>
               </FormControl>
            </Box>

         </form>
      </section>
   )
}