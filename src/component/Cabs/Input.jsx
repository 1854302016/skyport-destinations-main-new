import React from 'react'

function Input() {
  return (
    <div>
      <h1>Show a Time Input Control</h1>

<p>The <strong>input type="time"</strong> allows the user to select a time (no time zone):</p>

<p>If the browser supports it, a time picker pops up when entering the input field.</p>


  
  <input type="time" id="appt" name="appt"></input>
    </div>
  )
}

export default Input
