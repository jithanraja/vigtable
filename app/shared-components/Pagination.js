import React from 'react';
import PropTypes from 'prop-types';
import { Icon } from 'src/components';
import {View,StyleSheet,TouchableOpacity,Text} from 'react-native'
// const propTypes = {
//     items: PropTypes.array.isRequired,
//     onChangePage: PropTypes.func.isRequired,
//     initialPage: PropTypes.number,
//     pageSize: PropTypes.number
// }

// const defaultProps = {
//     initialPage: 1,
//     pageSize: 3
// }

class Pagination extends React.Component {
    constructor(props) {
        super(props);
        this.state = { pager: {} ,   initialPage: 1,
        pageSize: 3,items:props.items};
    }

    
    componentWillMount() {
    
        // set page if items array isn't empty
        if (this.props.items && this.props.items.length) {
            this.setPage(this.state.initialPage);
        }
    }

    // componentWillReceiveProps(nextProps) {
    //     console.log("ffff",this.props.items)
    //     if (this.props.items !== nextProps.items) {
    //         this.setPage(this.props.initialPage);
    //     }
    //   }
    
    // componentDidUpdate(prevProps, prevState) {
    //     // reset page if items array has changed
    //     console.log("fff",this.props.items)
    //     if (this.props.items !== prevProps.items) {
    //         this.setPage(this.props.initialPage);
    //     }
    // }

    setPage(page) {
      
        var { items, pageSize } = this.state;
        var pager = this.state.pager;

        if (page < 1 || page > pager.totalPages) {
            return;
        }

        // get new pager object for specified page
        pager = this.getPager(items.length, page, pageSize);

        // get new page of items from items array
        var pageOfItems = items.slice(pager.startIndex, pager.endIndex + 1);

        // update state
        this.setState({ pager: pager });

        // call change page function in parent component
        this.props.onChangePage(pageOfItems);
    }

    getPager(totalItems, currentPage, pageSize) {
        // default to first page
        currentPage = currentPage || 1;

        // default page size is 10
        pageSize = pageSize || 10;

        // calculate total pages
        var totalPages = Math.ceil(totalItems / pageSize);

        var startPage, endPage;
        if (totalPages <= 10) {
            // less than 10 total pages so show all
            startPage = 1;
            endPage = totalPages;
        } else {
            // more than 10 total pages so calculate start and end pages
            if (currentPage <= 6) {
                startPage = 1;
                endPage = 10;
            } else if (currentPage + 4 >= totalPages) {
                startPage = totalPages - 9;
                endPage = totalPages;
            } else {
                startPage = currentPage - 5;
                endPage = currentPage + 4;
            }
        }

        // calculate start and end item indexes
        var startIndex = (currentPage - 1) * pageSize;
        var endIndex = Math.min(startIndex + pageSize - 1, totalItems - 1);

        // create an array of pages to ng-repeat in the pager control
        var pages = [...Array((endPage + 1) - startPage).keys()].map(i => startPage + i);

        // return object with all pager properties required by the view
        return {
            totalItems: totalItems,
            currentPage: currentPage,
            pageSize: pageSize,
            totalPages: totalPages,
            startPage: startPage,
            endPage: endPage,
            startIndex: startIndex,
            endIndex: endIndex,
            pages: pages
        };
    }

    render() {
            
        var pager = this.state.pager;
        //console.log("fff",pager)
        if (!pager.pages || pager.pages.length <= 1) {
            // don't display pager if there is only 1 page
            return null;
        }

        return (  <View style={styles.container}>
                  
                {/* <li className={pager.currentPage === 1 ? 'disabled' : ''}>
                    <a onClick={() => this.setPage(1)}>First</a>
                </li> */}
                <TouchableOpacity style={[styles.btbox,{borderColor:pager.currentPage === 1 ? 'gray' : '#ffffff'}]}  
                onPress={() =>  pager.currentPage === 1?'':this.setPage(pager.currentPage - 1)}   >
                   
                    <Icon
                type={'antdesign'}
                name='arrowleft'
                color={pager.currentPage === 1 ? 'gray' : '#ffffff'}
                size={20} />
                </TouchableOpacity>
                {pager.pages.map((page, index) =>
                    <TouchableOpacity style={[styles.box,{backgroundColor:pager.currentPage === page?'#ffffff':null}]} onPress={() =>  this.setPage(page)}  className={pager.currentPage === page ? 'active' : ''}>
                        <Text style={[styles.text,{color:pager.currentPage === page ?  '#FF6E40':'#ffff'}]}>{page}</Text>
                    </TouchableOpacity>
                )}
                <TouchableOpacity style={[styles.btbox,{borderColor:pager.currentPage === pager.totalPages?'gray' : '#ffffff'}]} onPress={() =>pager.currentPage === pager.totalPages ? '':this.setPage(pager.currentPage + 1)} >
                  
                    <Icon
                type={'antdesign'}
                name='arrowright'
                color={pager.currentPage === pager.totalPages ? 'gray' : '#ffffff'}
                size={20} />
                </TouchableOpacity>
                {/* <li className={pager.currentPage === pager.totalPages ? 'disabled' : ''}>
                    <a onClick={() => this.setPage(pager.totalPages)}>Last</a>
                </li> */}
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
     flexDirection:'row',
     flex:1,
     height:50
    },
    text:{
        color:'#ffffff',
        textAlign:'center'
    },
    box:{
      borderRadius:50,
      margin:2,
      width:20,
      height:20,
      justifyContent:'center'
    },
    btbox:{
      borderColor:'#ffffff',
      borderWidth:1,
      borderRadius:50,
      marginRight:5,
      marginLeft:5,
      width:25,
      height:25,
      justifyContent:'center'
    }
  });
// Pagination.propTypes = propTypes;
// Pagination.defaultProps = defaultProps;
export default Pagination;