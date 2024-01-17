// src/components/ScheduleForm.tsx
import React, { useState } from 'react';
import { timeOptions } from '../utils/time';
import { Button, Modal } from 'react-bootstrap';

interface ScheduleFormProps {
  onClose: () => void;
  onSubmit: (schedule: any) => void;
  initialData?: any;
}

const ScheduleForm: React.FC<ScheduleFormProps> = ({
  onClose,
  onSubmit,
  initialData,
}) => {
  const [formData, setFormData] = useState(initialData || {});
  const [selectedDays, setSelectedDays] = useState<string[]>([]);

  const daysOfWeek = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];

  const handleChange = (e: any) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = () => {
    onSubmit(formData);
    setFormData({});
  };

  const handleDayClick = (day: string) => {
    if (selectedDays.includes(day)) {
      setSelectedDays(
        selectedDays.filter((selectedDay) => selectedDay !== day)
      );
    } else {
      setSelectedDays([...selectedDays, day]);
    }
  };

  return (
    <div>
      {/* Model */}

      <Modal show={true} onHide={onClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            {`${initialData === null ? 'Add' : 'Edit'}`} Schedule
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="form-group row mb-3">
            <label className="col-sm-3 col-form-label">Title</label>
            <div className="col-sm-9">
              <input
                type="text"
                name="title"
                value={formData.title || ''}
                onChange={handleChange}
                className="form-control"
              />
            </div>
          </div>
          <div className="form-group row mb-3">
            <label className="col-sm-3 col-form-label">Description</label>
            <div className="col-sm-9">
              <textarea
                className="form-control"
                id="exampleFormControlTextarea1"
                rows={3}
                onChange={handleChange}
                name="description"
              >
                {formData.description || ''}
              </textarea>
            </div>
          </div>
          <div className="form-group row mb-3">
            <label className="col-sm-3 col-form-label">Subject</label>
            <div className="col-sm-9">
              <input
                type="text"
                name="subject"
                value={formData.subject || ''}
                onChange={handleChange}
                className="form-control"
              />
            </div>
          </div>
          <div className="form-group row mb-3">
            <label className="col-sm-3 col-form-label">Frequency</label>
            <div className="col-sm-9">
              <select
                name="frequancy"
                className="form-control"
                id="exampleFormControlSelect1"
                onChange={handleChange}
                value={formData.frequancy || ''}
              >
                <option value="">Select Frequancy</option>
                <option value="Monthly">Monthly</option>
                <option value="Weekly">Weekly</option>
                <option value="Daily">Daily</option>
              </select>
            </div>
          </div>

          <div className="form-group row mb-3">
            <label className="col-sm-3 col-form-label">Repeat</label>
            <div className="col-sm-9 d-flex justify-content-around timeslot">
              {formData.frequancy === 'Weekly' &&
                daysOfWeek.map((day) => (
                  <div
                    key={day}
                    className={`d-flex justify-content-center align-items-center ${
                      selectedDays.includes(day) ? 'active' : ''
                    }`}
                    onClick={() => handleDayClick(day)}
                  >
                    {day.substring(0, 1)}
                  </div>
                ))}
              {formData.frequancy === 'Monthly' && (
                <select className="form-control">
                  <option>First Monday</option>
                  <option>Last Friday</option>
                </select>
              )}
            </div>
          </div>

          <div className="form-group row mb-3">
            <label className="col-sm-3 col-form-label">Time</label>
            <div className="col-sm-9">
              <select
                name="time"
                className="form-control"
                id="exampleFormControlSelect1"
                onChange={handleChange}
                value={formData.time || ''}
              >
                <option value="">Select Time</option>
                {timeOptions.map((time) => (
                  <option value={time.label}>{time.label}</option>
                ))}
              </select>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            {`${initialData === null ? 'Done' : 'Update'}`}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ScheduleForm;
