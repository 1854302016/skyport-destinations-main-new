import { Form } from "react-bootstrap";
import "./WebCheckInForm.css";
import { CountriesArray } from "./Countries";
import { Link } from "react-router-dom";

const WebCheckInForm = ({ closeWebInput, code, name, setCountry }) => {
  const handleBackToMainPage = () => {
    closeWebInput();
  };

  const handleDoSubmit = (code, name) => {
    const country = {
      code: code,
      name: name,
    };
    setCountry(country);
    closeWebInput();
    // Implement redirection logic
  };

  return (
    <div className="tclassWrap">
      <div className="seconddiv">
        <div className="top_pnl app-hide">
          <div className="inner_block">
            <div className="lft_pnl">
              <Link
                onClick={() => handleBackToMainPage()}
                className="back_arrow"></Link>
              <span className="title">Select Nationality</span>
            </div>
            <div className="clr"></div>
          </div>
          <div className="clr"></div>
        </div>
        <div className="clr"></div>
        <div className="inner_block listtt">
          <Form>
            {/* <Form.Group> */}
            {CountriesArray.map((country, index) => (
              <Form.Label
                key={index}
                className="cont-rdo1"
                onClick={() => {
                  handleDoSubmit(country.code, country.name);
                }}>
                <input
                  type="radio"
                  name="url"
                  value={country.name}
                  defaultChecked={country.code === "af"}
                />
                <img
                  src={`https://flagcdn.com/w20/${country.code}.png`}
                  width="25"
                  className="aimg"
                  alt=""
                />
                <span className="ftn14">
                  {country.name} ({country.code.toUpperCase()})
                </span>
                <span className="ckmark-rdo1"></span>
              </Form.Label>
            ))}
            {/* Additional Form.Label for other airlines */}
            {/* </Form.Group> */}
            {/* <input
              type="submit"
              value="Continue"
              className="Btnclass2"
              fdprocessedid="txjxw3"
            /> */}
          </Form>
          {/* <p className="pr-text">
            *You will be redirected to your airline's page on clicking
            'Continue' button.
          </p> */}
        </div>
      </div>
    </div>
  );
};

export default WebCheckInForm;
