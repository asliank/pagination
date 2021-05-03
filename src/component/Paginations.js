import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDetails } from "../redux/Action";
import ReactTable from "react-table-6";
import { toast } from "react-toastify";
import { Button, Link } from "@material-ui/core";
import "react-table-6/react-table.css";
import { useHistory } from "react-router";
export default function Paginations() {
  const [pageCount, setPageCount] = useState(0);
  const [loading] = useState("Loading.....");
  const dispatch = useDispatch();
  const getData = useSelector((state) => state.getData);
  const error = useSelector((state) => state.error);
  const history = useHistory();

  const handleClick = (data) => {
    history.push({ pathname: "/json_data", data: data });
  };
  useEffect(() => {
    const fetch = () => {
      setTimeout(() => {
        dispatch(
          getDetails(
            `http://hn.algolia.com/api/v1/search_by_date?tags=story&page=${pageCount}`
          )
        );
        setPageCount(pageCount + 1);
      }, 10000);
    };
    fetch();
  }, [pageCount, dispatch]);

  const column = [
    {
      Header: () => <h5 className="row-design">TITLE</h5>,
      accessor: "title",
    },
    {
      Header: () => <h5 className="row-design">URL</h5>,
      accessor: "url",
      Cell: (props) => {
        return (
          <Link href={props.value || "#"} target="_blank">
            URL
          </Link>
        );
      },
    },
    {
      Header: () => <h5 className="row-design">CREATED_AT </h5>,
      accessor: "created_at",
    },
    {
      Header: () => <h5 className="row-design">AUTHOR</h5>,
      accessor: "author",
    },
    {
      Header: () => <h5 className="row-design">ACTION</h5>,
      Cell: (props) => {
        return (
          <Button
            variant="outlined"
            color="primary"
            onClick={() => handleClick(props.original)}
          >
            Row Origin Data
          </Button>
        );
      },
    },
  ];
  return (
    <div>
      {error === null ? (
        <ReactTable
          className="-striped -highlight"
          data={getData}
          columns={column}
          defaultPageSize={10}
          noDataText={loading}
        />
      ) : (
        toast.error(error)
      )}
    </div>
  );
}
