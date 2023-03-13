class ApiFeatures {
    constructor(query, queryStr){
        this.query = query;
        this.queryStr = queryStr;
    }

    search = ()=>{
        const keyword = this.queryStr.keyword?{
            name : {
                $regex : this.queryStr.keyword,
                $options : "i"
            }
        }:{};
        this.query = this.query.find(keyword);
        return this;
    }

    filter(){
        const queryCopy = {...this.queryStr};

        // category filter
        const remove = ['keyword', 'page', 'limit'];
        remove.forEach((key)=>{delete queryCopy[key]});

        // price filter
        let queryString = JSON.stringify(queryCopy);

        //replacing gte to $gte ('$' mongo format)
        queryString = queryString.replace(/\b(gt|gte|lt|lte)/g,(match)=>{return `$${match}`});

        this.query = this.query.find(JSON.parse(queryString));
        return this;
    }

    pagination(resultPerPage){
        const currentPage = (this.queryStr.page) || 1;

        const skip = resultPerPage*(currentPage-1);

        this.query = this.query.limit(resultPerPage).skip(skip);

        return this;
    }
}

module.exports = ApiFeatures;