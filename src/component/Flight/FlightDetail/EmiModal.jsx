import React from 'react'
import './Emi.css'



const EmiModal = ({emiBtn,setEmiBtn}) => {
  return (
    <div className="emipop ng-scope" ng-if="isEmi">
    <div className="emibox">
      <div className="hdemi">EMI plan with EMT</div>
      <div className="pop_c_bx">
        <a className="closeemi" onClick={()=>setEmiBtn(!emiBtn)}>
          ×
        </a>
        <div className="emiplan">
          <table>
            <tbody>
              <tr>
                <th width="40%">EMI Type</th>
                <th width="20%"> Months </th>
                <th width="20%"> Monthly EMI</th>
              </tr>
              {/* ngRepeat: tk in EmiLst */}
              {/* ngIf: tk.type == 'No Cost EMI' ||tk.type == 'No Cost'  */}
              {/* end ngRepeat: tk in EmiLst */}
              {/* ngIf: tk.type == 'No Cost EMI' ||tk.type == 'No Cost'  */}
              {/* end ngRepeat: tk in EmiLst */}
              {/* ngIf: tk.type == 'No Cost EMI' ||tk.type == 'No Cost'  */}
              {/* end ngRepeat: tk in EmiLst */}
              {/* ngIf: tk.type == 'No Cost EMI' ||tk.type == 'No Cost'  */}
              {/* end ngRepeat: tk in EmiLst */}
              {/* ngIf: tk.type == 'No Cost EMI' ||tk.type == 'No Cost'  */}
              {/* end ngRepeat: tk in EmiLst */}
              {/* ngIf: tk.type == 'No Cost EMI' ||tk.type == 'No Cost'  */}
              {/* end ngRepeat: tk in EmiLst */}
              {/* ngIf: tk.type == 'No Cost EMI' ||tk.type == 'No Cost'  */}
              <tr
                ng-repeat="tk in EmiLst"
                ng-if="tk.type == 'No Cost EMI' ||tk.type == 'No Cost' "
                className="ng-scope"
              >
                {/* ngIf: tk.type == 'No Cost EMI' */}
                <td
                  rowSpan={3}
                  ng-if="tk.type == 'No Cost EMI'"
                  className="ng-scope"
                >
                  No Cost EMI
                </td>
                {/* end ngIf: tk.type == 'No Cost EMI' */}
                <td className="ng-binding">3</td>
                <td className="ng-binding">$41973</td>
              </tr>
              {/* end ngIf: tk.type == 'No Cost EMI' ||tk.type == 'No Cost'  */}
              {/* end ngRepeat: tk in EmiLst */}
              {/* ngIf: tk.type == 'No Cost EMI' ||tk.type == 'No Cost'  */}
              <tr
                ng-repeat="tk in EmiLst"
                ng-if="tk.type == 'No Cost EMI' ||tk.type == 'No Cost' "
                className="ng-scope"
              >
                {/* ngIf: tk.type == 'No Cost EMI' */}
                <td className="ng-binding">6</td>
                <td className="ng-binding">$20987</td>
              </tr>
              {/* end ngIf: tk.type == 'No Cost EMI' ||tk.type == 'No Cost'  */}
              {/* end ngRepeat: tk in EmiLst */}
            </tbody>
          </table>
          <table className="bdrtp">
            <tbody>
              {/* ngRepeat: tk in EmiLst */}
              {/* ngIf: tk.type == 'Standard EMI' || tk.type == 'Standard'  */}
              <tr
                ng-repeat="tk in EmiLst"
                ng-if="tk.type == 'Standard EMI' || tk.type == 'Standard' "
                className="ng-scope"
              >
                {/* ngIf: tk.type == 'Standard EMI' */}
                <td
                  width="40%"
                  rowSpan={6}
                  ng-if="tk.type == 'Standard EMI'"
                  className="ng-scope"
                >
                  Standard EMI
                </td>
                {/* end ngIf: tk.type == 'Standard EMI' */}
                <td width="20%" className="ng-binding">
                  3
                </td>
                <td width="20%" className="ng-binding">
                  $43805
                </td>
              </tr>
              {/* end ngIf: tk.type == 'Standard EMI' || tk.type == 'Standard'  */}
              {/* end ngRepeat: tk in EmiLst */}
              {/* ngIf: tk.type == 'Standard EMI' || tk.type == 'Standard'  */}
              <tr
                ng-repeat="tk in EmiLst"
                ng-if="tk.type == 'Standard EMI' || tk.type == 'Standard' "
                className="ng-scope"
              >
                {/* ngIf: tk.type == 'Standard EMI' */}
                <td width="20%" className="ng-binding">
                  6
                </td>
                <td width="20%" className="ng-binding">
                  $22606
                </td>
              </tr>
              {/* end ngIf: tk.type == 'Standard EMI' || tk.type == 'Standard'  */}
              {/* end ngRepeat: tk in EmiLst */}
              {/* ngIf: tk.type == 'Standard EMI' || tk.type == 'Standard'  */}
              <tr
                ng-repeat="tk in EmiLst"
                ng-if="tk.type == 'Standard EMI' || tk.type == 'Standard' "
                className="ng-scope"
              >
                {/* ngIf: tk.type == 'Standard EMI' */}
                <td width="20%" className="ng-binding">
                  9
                </td>
                <td width="20%" className="ng-binding">
                  $15550
                </td>
              </tr>
              {/* end ngIf: tk.type == 'Standard EMI' || tk.type == 'Standard'  */}
              {/* end ngRepeat: tk in EmiLst */}
              {/* ngIf: tk.type == 'Standard EMI' || tk.type == 'Standard'  */}
              <tr
                ng-repeat="tk in EmiLst"
                ng-if="tk.type == 'Standard EMI' || tk.type == 'Standard' "
                className="ng-scope"
              >
                {/* ngIf: tk.type == 'Standard EMI' */}
                <td width="20%" className="ng-binding">
                  12
                </td>
                <td width="20%" className="ng-binding">
                  $12029
                </td>
              </tr>
              {/* end ngIf: tk.type == 'Standard EMI' || tk.type == 'Standard'  */}
              {/* end ngRepeat: tk in EmiLst */}
              {/* ngIf: tk.type == 'Standard EMI' || tk.type == 'Standard'  */}
              <tr
                ng-repeat="tk in EmiLst"
                ng-if="tk.type == 'Standard EMI' || tk.type == 'Standard' "
                className="ng-scope"
              >
                {/* ngIf: tk.type == 'Standard EMI' */}
                <td width="20%" className="ng-binding">
                  18
                </td>
                <td width="20%" className="ng-binding">
                  $8522
                </td>
              </tr>
              {/* end ngIf: tk.type == 'Standard EMI' || tk.type == 'Standard'  */}
              {/* end ngRepeat: tk in EmiLst */}
              {/* ngIf: tk.type == 'Standard EMI' || tk.type == 'Standard'  */}
              <tr
                ng-repeat="tk in EmiLst"
                ng-if="tk.type == 'Standard EMI' || tk.type == 'Standard' "
                className="ng-scope"
              >
                {/* ngIf: tk.type == 'Standard EMI' */}
                <td width="20%" className="ng-binding">
                  24
                </td>
                <td width="20%" className="ng-binding">
                  $6783
                </td>
              </tr>
              {/* end ngIf: tk.type == 'Standard EMI' || tk.type == 'Standard'  */}
              {/* end ngRepeat: tk in EmiLst */}
              {/* ngIf: tk.type == 'Standard EMI' || tk.type == 'Standard'  */}
              {/* end ngRepeat: tk in EmiLst */}
              {/* ngIf: tk.type == 'Standard EMI' || tk.type == 'Standard'  */}
              {/* end ngRepeat: tk in EmiLst */}
            </tbody>
          </table>
        </div>
        <div className="inempbx">
          <div className="hdemi">Get in touch with us.</div>
          <div className="flxdiv">
            <div className="wd40 inpt-cv">
              <input
                type="text"
                ng-model="queryDetail.Name"
                className="inpemi ng-pristine ng-untouched ng-valid ng-empty"
                placeholder="Full Name"
                ng-click="Redir()"
              />
              <div
                className="alertmsg ng-binding ng-hide"
                ng-show="validErrName.length>0"
              />
            </div>
            <div className="wd40 inpt-cv">
              <input
                type="text"
                ng-model="queryDetail.Email"
                className="inpemi ng-pristine ng-untouched ng-valid ng-empty"
                placeholder="Email"
                ng-click="Redir()"
              />
              {/* ngIf: validErrEmail.length>0 */}
            </div>
            <div className="wd40 inpt-cv">
              <input
                type="text"
                ng-model="queryDetail.MobileNo"
                maxLength={10}
                className="inpemi ng-pristine ng-untouched ng-valid ng-empty ng-valid-maxlength"
                placeholder="Mobile Number"
                ng-click="Redir()"
              />
              {/* ngIf: validErrMb.length>0 */}
            </div>
            <div className="wid150">
              <input
                ng-click="SubmitQueryDetailSankash()"
                id=""
                type="button"
                name=""
                defaultValue="Apply"
                className="inpemisub"
              />
            </div>
          </div>
          <lable
            style={{ fontSize: 12, color: "forestgreen" }}
            className="ng-binding"
          />
        </div>
        <div className="eminotes">
          <div className="fon-note">Please Note:</div>
          <ul className="listitm">
            <li>EMI is inclusive of the processing fee and applicable GST.</li>
            <li>
              Loan Protector Insurance: 1% of the package amount is mandatory and
              included in the EMI.
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
  
  )
}

export default EmiModal