import { useState, useEffect } from "react"
import axios from "axios"

function PersonInformation() {
    const [data, setData] = useState()
    const [filteredData, setFilteredData] = useState()
    const [search, setSearch] = useState()
    const [currentPage, setCurrentPage] = useState(1)
    const [dataperPage] = useState(5)

//fetch data
    const fetchData = async () => {
        try {
            const response = await axios('https://mock-api.mortgagebasket.co.uk/v1/users?pageSize=100')
            console.log(response.data)
            const { data } = response.data

            setData(data)
        } catch (error) {
            console.log(error)
        }
    }

    //handle search input
    const handleSearch = (event) => {
        setSearch(event.target.value)
    }

    // handle filter
    const filterData = () => {
        const filtered = data.filter((item) => item.name.toLowerCase().includes(search.toLowerCase()) ||
            item.email.toLowerCase().includes(search.toLowerCase())

        )
        setFilteredData(filtered)
        setData(filtered)
    }

    // handle pagination
    const pagination = (pageNum) => {
        setCurrentPage(pageNum)
    }

    const indexOfLastData = currentPage * dataperPage;
    const indexOfFirstData = indexOfLastData - dataperPage;
    const curretData = data && data.slice(indexOfFirstData, indexOfLastData)
    console.log(curretData)
    useEffect(() => {
        fetchData()

    }, [])
    return (
        <section>
            <div>
                <input type="search" value={search} onChange={handleSearch}></input>
                <button onClick={filterData} type="submit">submit</button>
            </div>

            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>
                            date of birth
                        </th>
                        <th>Image</th>
                    </tr>
                </thead>
                <tbody>
                    {curretData?.map((item, index) => {
                        return <tr key={index}>
                            <td>{item.name}</td>
                            <td>{item.email}</td>
                            <td>{item.date_of_birth}</td>
                            <td>
                                <img src={item.imageUrl}></img>
                            </td>
                        </tr>
                    })}

                </tbody>
            </table>
            <div>
                {Array.from({ length: Math.ceil(data && data.length / dataperPage) }).map(
                    (_, index) => (
                        <button onClick={() => pagination(index + 1)} key={index}>{index + 1}</button>
                    )
                )}
            </div>
        </section>
    )
}

export default PersonInformation