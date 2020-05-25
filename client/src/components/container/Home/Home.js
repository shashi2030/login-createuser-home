import React, { Component } from "react";
import { ItemList } from '../../presentation/ItemList/ItemList';
import { data } from '../../../constants/data';
import { Header } from '../../presentation/Header/Header';
import Accordion from '../Accordion/Accordion';
import * as constants from '../../../constants';

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataList: data.results,
            filteredDataList:data.results,
            filteredOption: constants.FILTERED_OPTIONS,
            searchText : '',
            sortOption:''
        }
    }
    addedFilterOption = (options=this.state.filteredOption) => {
        const data = this.state.dataList;
        const sortingData = this.sortByID(data, this.state.sortOption);
        const filteredData = options[constants.SPECIES].length > 0 ? 
        sortingData.filter(item => {
            return options[constants.SPECIES].includes(item.species.toLowerCase())
        }) : sortingData;
        this.handlegenderFiltered(filteredData, options);
    }

    handlegenderFiltered = (all_data, options) =>{
        const filteredData = options[constants.GENDER].length > 0 ? 
        all_data.filter(item => {
            return options[constants.GENDER].includes(item.gender.toLowerCase())
        }) : all_data;

        this.handleOriginFiltered(filteredData, options);

    }

    handleOriginFiltered = (all_data, options) =>{
        const filteredData = options[constants.ORIGIN].length > 0 ? 
        all_data.filter(item => {
            return options[constants.ORIGIN].includes(item.origin.name.toLowerCase())
        }) : all_data;

        this.handleSearch(filteredData, options);
    }

    handleSearch = (all_data, options) =>{
        const searchText = this.state.searchText;
        const filteredData = searchText.length > 0 ? all_data.filter(charactor =>{
            return charactor.name.toLowerCase().includes(searchText);
        }) : all_data;
        this.setState({
            filteredDataList:filteredData,
            filteredOption: options
        })
    }
    
    
    searchByName = (e) =>{
        const searchText = e.target.value;
        this.setState({
            searchText:searchText.toLowerCase()
        }, () => {
            this.addedFilterOption()
        });        
    }

    sortByID = (all_data, sortOption) =>{
        const filterdata = sortOption.length > 0 ? all_data.sort((a,b) => {
            return sortOption === constants.ASCENDING ? (a.id - b.id) : (b.id - a.id)
        }): all_data;

        return filterdata;
    }

    handleSorting = (sortOption) => {        
        const filteredData = this.sortByID(this.state.filteredDataList, sortOption);
        this.setState({
            sortOption:sortOption,
            filteredDataList:filteredData
        });        
    }

    handleLogout = () =>{
        this.props.history.push('/');
    }

    render() {
        return (
            <>
                <Header searchByName={this.searchByName} handleSorting={this.handleSorting} handleLogout={this.handleLogout} />
                <Accordion data={this.state.dataList} filteredOption={this.addedFilterOption} />
                <ItemList data={this.state.filteredDataList} />
            </>
        )
    }
}

export default Home;