import React, { useState, useEffect } from 'react';
import ScheduleForm from './ScheduleForm';
import { Button } from 'react-bootstrap';
import RestoreFromTrashIcon from '@mui/icons-material/RestoreFromTrash';
import CreateIcon from '@mui/icons-material/Create';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import SearchIcon from '@mui/icons-material/Search';
import { dummyData } from '../dummyData';


const ScheduleLists: React.FC = () => {
  const newData = dummyData;
  const [schedules, setSchedules] = useState<any[]>([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedSchedule, setSelectedSchedule] = useState<any | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    setSchedules(newData);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleAdd = () => {
    setSelectedSchedule(null);
    setIsFormOpen(true);
  };

  const handleEdit = (schedule: any) => {
    setSelectedSchedule(schedule);
    setIsFormOpen(true);
  };

  const handleDelete = (id: string) => {
    setSchedules((prevSchedules) =>
      prevSchedules.filter((schedule) => schedule?.id !== id)
    );
  };
console.log("data", schedules)
  const handleFormClose = () => {
    setIsFormOpen(false);
  };

  const handleFormSubmit = (newSchedule: any) => {
    if (selectedSchedule) {
      setSchedules((prevSchedules) =>
        prevSchedules.  map((schedule) =>
          schedule?.id === selectedSchedule?.id
            ? { ...schedule, ...newSchedule }
            : schedule
        )
      );
    } else {
      setSchedules((prevSchedules) => [
        ...prevSchedules,
        { ...newSchedule, id: prevSchedules.length + 1 },
      ]);
    }

    setIsFormOpen(false);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const filteredSchedules = schedules.filter((schedule) =>
    schedule?.title?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <div>
        <div className="header d-flex justify-content-between mb-4">
          <div className="row">
            <div className="col-sm-12 search-input-container">
              <input
                className="form-control"
                type="text"
                placeholder="Search by title"
                value={searchQuery}
                onChange={handleSearchChange}
              />
              <SearchIcon className="search-icon" />
            </div>
          </div>

          <Button variant="primary" className="addBtn" onClick={handleAdd}>
            <AddCircleOutlineIcon /> Add
          </Button>
        </div>
        <div className="tableContainer">
          <table className="table">
            <thead>
              <tr>
                <th scope="col">Title</th>
                <th scope="col">Description</th>
                <th scope="col">Subject</th>
                <th scope="col">Schedule</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredSchedules.length === 0 ? (
                <h4>Data Not Found</h4>
              ) : (
                filteredSchedules.map((schedule) => (
                  <tr>
                    <td>{schedule?.title}</td>
                    <td>{schedule?.description}</td>
                    <td>{schedule?.subject}</td>
                    <td>{`${schedule?.frequancy} at ${schedule?.time}`}</td>
                    <td>
                      <CreateIcon onClick={() => handleEdit(schedule)} />
                      <RestoreFromTrashIcon
                        style={{ color: 'darkslateblue' }}
                        onClick={() => handleDelete(schedule?.id)}
                      />
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
      {isFormOpen && (
        <ScheduleForm
          onClose={handleFormClose}
          onSubmit={handleFormSubmit}
          initialData={selectedSchedule}
        />
      )}
    </div>
  );
};

export default ScheduleLists;
