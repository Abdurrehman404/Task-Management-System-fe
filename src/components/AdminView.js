import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";

import DataTable from "./DataTable";
function AdminView() {
  const [allUsers, setAllUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await axios.get("users");
      let userInfo = response.data.dto;
      setAllUsers(userInfo);
      setLoading(false);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div>
      <DataTable
        allUsers={allUsers}
        loading={loading}
        setAllUsers={setAllUsers}
      />
    </div>
  );
}
export default AdminView;
