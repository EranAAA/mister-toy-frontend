import { Link } from "react-router-dom";
import { connect } from "react-redux";
import React from 'react'
import Button from '@mui/material/Button';

import { loadToys, addToy, editToy, filtering } from '../store/actions/toy.action.js'
import { ToyList } from '../cmps/toy-list.jsx'
import { ToyFilter } from '../cmps/toy-filter.jsx'

class _ToyApp extends React.Component {

    state = {
        page: 0
    }

    componentDidMount() {
        this.props.loadToys()
    }

    onFilterBy = (filterObj) => {
        this.props.filtering(filterObj)
    }

    toysForDisplay = () => {
        let { toys } = this.props
        const { page } = this.state
        return toys.slice(page * 20, page * 20 + 20)
    }

    onPage = (num) => {
        const { toys } = this.props
        const { page } = this.state

        if ((page + num) >= Math.ceil(toys.length / 20)) return
        if ((page + num) < 0) return

        this.setState({ page: page + num }, () => {
            this.toysForDisplay()
        })
    }

    render() {
        const { toys, filterBy, user } = this.props
        const { page } = this.state
        const totalPage = !!toys && Math.ceil(toys.length / 20)
        // console.log('filterBy From toy-app', filterBy)

        return (
            <div>
                <main className="toy-app">
                    <div className="toy-main-top">
                        <div className="add-toy-btn">

                            {user && (user.isAdmin &&  <Button><Link to={`/toy/edit/new`}>Add Toy</Link></Button> )}
                            
                        </div>
                        <ToyFilter onFilterBy={this.onFilterBy} filterBy={filterBy} />
                        <div className="paging-container">
                            <Button onClick={() => { this.onPage(-1) }} variant="contained" color="inherit" >Back</Button>
                            {` ${page + 1} / ${totalPage} `}
                            <Button onClick={() => { this.onPage(1) }} variant="contained" color="inherit" >Next</Button>
                        </div>
                    </div>
                    {!!this.toysForDisplay().length && <ToyList toys={this.toysForDisplay()} />}
                    {!this.toysForDisplay().length && <div className="loader"></div>}
                </main>
            </div>
        )
    }
}

const mapStateToProps = (storeState) => {
    return {
        toys: storeState.toyModule.toys,
        filterBy: storeState.toyModule.filterBy,
        user: storeState.userModule.user
    }
}

const mapDispatchToProps = {
    loadToys,
    addToy,
    editToy,
    filtering
}

export const ToyApp = connect(
    mapStateToProps,
    mapDispatchToProps
)(_ToyApp)
