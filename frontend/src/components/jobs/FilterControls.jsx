import { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const FilterControls = ({ filters, onFilterChange }) => {
  const [startDate, setStartDate] = useState(filters.startDate ? new Date(filters.startDate) : null);
  const [endDate, setEndDate] = useState(filters.endDate ? new Date(filters.endDate) : null);

  const handleStatusChange = (e) => {
    onFilterChange({ status: e.target.value });
  };

  const handleSortChange = (e) => {
    onFilterChange({ sortBy: e.target.value });
  };

  const handleStartDateChange = (date) => {
    setStartDate(date);
    onFilterChange({ startDate: date ? date.toISOString() : '' });
  };

  const handleEndDateChange = (date) => {
    setEndDate(date);
    onFilterChange({ endDate: date ? date.toISOString() : '' });
  };

  const handleClearFilters = () => {
    setStartDate(null);
    setEndDate(null);
    onFilterChange({
      status: '',
      startDate: '',
      endDate: '',
      sortBy: 'applicationDate'
    });
  };

  return (
    <div className="filter-controls">
      <div className="filter-group">
        <label htmlFor="status">Filter by Status</label>
        <select
          id="status"
          value={filters.status}
          onChange={handleStatusChange}
        >
          <option value="">All Statuses</option>
          <option value="Applied">Applied</option>
          <option value="Interview">Interview</option>
          <option value="Offer">Offer</option>
          <option value="Rejected">Rejected</option>
        </select>
      </div>

      <div className="filter-group">
        <label htmlFor="startDate">From Date</label>
        <DatePicker
          id="startDate"
          selected={startDate}
          onChange={handleStartDateChange}
          selectsStart
          startDate={startDate}
          endDate={endDate}
          placeholderText="Start Date"
          dateFormat="MMM d, yyyy"
          className="date-picker"
        />
      </div>

      <div className="filter-group">
        <label htmlFor="endDate">To Date</label>
        <DatePicker
          id="endDate"
          selected={endDate}
          onChange={handleEndDateChange}
          selectsEnd
          startDate={startDate}
          endDate={endDate}
          minDate={startDate}
          placeholderText="End Date"
          dateFormat="MMM d, yyyy"
          className="date-picker"
        />
      </div>

      <div className="filter-group">
        <label htmlFor="sortBy">Sort By</label>
        <select
          id="sortBy"
          value={filters.sortBy}
          onChange={handleSortChange}
        >
          <option value="applicationDate">Date (Newest First)</option>
          <option value="dateAsc">Date (Oldest First)</option>
          <option value="company">Company Name</option>
          <option value="role">Role</option>
          <option value="status">Status</option>
        </select>
      </div>

      <div className="filter-group">
        <label>&nbsp;</label>
        <button onClick={handleClearFilters}>Clear Filters</button>
      </div>
    </div>
  );
};

export default FilterControls;