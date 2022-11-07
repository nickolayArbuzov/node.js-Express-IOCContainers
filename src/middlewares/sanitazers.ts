import { CustomSanitizer, query, validationResult } from 'express-validator';

const initSortBy:CustomSanitizer = value => {
    if(!value){
        return "createdAt"
    }
    return value
}
export const sortBySanitizer = query('sortBy').customSanitizer(initSortBy)

const initSearchNameTerm:CustomSanitizer = value => {
    if(!value){
        return ""
    }
    return value
}
export const searchNameTermSanitizer = query('searchNameTerm').customSanitizer(initSearchNameTerm)
const initSearchLoginTerm:CustomSanitizer = value => {
    if(!value){
        return ""
    }
    return value
}
export const searchLoginTermSanitizer = query('searchLoginTerm').customSanitizer(initSearchLoginTerm)
const initSearchEmailTerm:CustomSanitizer = value => {
    if(!value){
        return ""
    }
    return value
}
export const searchEmailTermSanitizer = query('searchEmailTerm').customSanitizer(initSearchEmailTerm)
const initSortDirection:CustomSanitizer = value => {
    if(!value || !value.includes('asc','desc')){
        return -1
    }
    if(value === "desc"){
        return -1
    }
    else return 1

}
export const sortDirectionSanitizer = query('sortDirection').customSanitizer(initSortDirection)

const initPageNumber:CustomSanitizer = value => {
    console.log(" initPafe "+value)
    if(!value || typeof value === "undefined"){
        console.log("value is undefined")
        return 1
    }
    return value
}
export const pageNumberSanitizer = query('pageNumber').customSanitizer(initPageNumber)

const initPageSize:CustomSanitizer = value => {
    if(!value || typeof value === "undefined") {
        console.log("value is undefined")
        return 10
    }
    return value
}
export const pageSizeSanitizer = query('pageSize').customSanitizer(initPageSize)