import React from "react";
import { Container } from "react-bootstrap";

const PrivacyPolicy = () => {
  return (
    <div>
      <section className="bannerInner">
        <Container>
          <h1>
            <b>Privacy Policy</b>
          </h1>
        </Container>
      </section>
      <section className="section_padding">
        <Container>
          <p>
            SkyPort Destinations (“SkyPort,” “we,” “us,” or “our”) is committed to protecting the privacy and confidentiality of all users who interact with our digital platforms and services. This Privacy Policy explains in a legally comprehensive, transparent, and structured manner how SkyPort collects, processes, discloses, retains, and safeguards personal information in accordance with applicable data protection laws in Guyana and relevant international standards including the General Data Protection Regulation (EU) 2016/679 (GDPR), where applicable. <br />
            This document is intended to ensure full legal compliance and to provide users with all necessary information regarding their rights, responsibilities, and the manner in which their data is managed.

          </p>
          <div className="terms_item">
            <h2>1. Scope and Applicability</h2>
            <p>
              This Privacy Policy governs the collection and use of personal data by SkyPort Destinations through its website, mobile applications, affiliated booking systems, customer service channels, and any digital or offline interaction directly involving SkyPort. It applies to all users regardless of geographic location and covers
              <ul>
                <li>Individuals making bookings via SkyPort</li>
                <li>Visitors interacting with our platforms (with or without registration)</li>
                <li>Customers receiving transactional, promotional, or support communications</li>
                <li>Individuals participating in surveys, promotions, or contests</li>
                <li>Recipients of marketing campaigns and newsletters</li>

              </ul>
            </p>
          </div>

          <div className="terms_item">
            <h2>2. Data Categories Collected</h2>
            <p>
              SkyPort collects personal information that is necessary for the provision of travel booking services and legal compliance. The types of personal data collected are outlined below. <br />
              <strong>a. Personal Identification Information -</strong> Full name, date of birth, gender - National ID/passport number, travel document details<br />
              <strong>b. Contact and Account Information -</strong> Email address, telephone number, residential address - Account credentials (username, hashed passwords) <br />
              <strong>c. Payment and Financial Information -</strong> Visa cardholder name, tokenized card details, billing address - Transaction amounts and payment confirmations (we do not store full card numbers)<br />
              <strong>d. Travel and Booking Data -</strong> Departure and destination locations - Flight numbers, class, itinerary details, special service requests - Booking reference codes and historical booking data<br />
              <strong>e. Technical and Device Information -</strong> IP address, device type, browser version, operating system - Session identifiers, geolocation (if permitted), referral URLs<br />
              <strong>f. Communication Records -</strong> Customer support tickets and email logs - Call recordings (if consented or legally permitted) - Feedback forms, complaints, or reviews<br />
              <strong>g. Usage and Behavioral Data -</strong> Website navigation and interaction logs - Cookies and similar tracking data (see Section 13) - Click behavior, bounce rate, time on page
            </p>
          </div>

          <div className="terms_item">
            <h2>3. Legal Grounds for Processing</h2>
            <p>
              SkyPort processes your personal data based on the following lawful bases, as prescribed by Guyana’s data protection laws and international best practices: <br />
              <ul>
                <li><strong>Contractual Necessity:</strong> For the provision of flight bookings and confirmation services.</li>
                <li><strong>Legal Obligation:</strong> Compliance with travel-related regulations (e.g., immigration, customs, tax, and anti-money laundering laws).</li>
                <li><strong>Legitimate Interests:</strong> Fraud detection, service improvements, and maintaining platform integrity.</li>
                <li><strong>Consent:</strong> For marketing, promotional engagement, and optional features.</li>
                <li><strong>Vital Interests:</strong> Where processing is necessary to protect your life or that of another individual (e.g., emergency travel disruptions).</li>

              </ul>
            </p>
          </div>

          <div className="terms_item">
            <h2>4. Purpose of Data Processing</h2>
            <p>
              SkyPort uses personal information exclusively for the purposes outlined below, each of which is supported by a lawful basis:<br />
              <ul>
                <li>Facilitate flight bookings, cancellations, modifications, and confirmations</li>
                <li>Process payments via authorized Visa payment gateways</li>
                <li>Deliver receipts, tickets, invoices, and travel itineraries</li>
                <li>Provide real-time customer support and service updates</li>
                <li>Conduct risk analysis, fraud prevention, and security monitoring</li>
                <li>Send service-related notices (transactional emails, disruption alerts)</li>
                <li>Develop aggregate statistics to improve platform functionality</li>
                <li>Conduct internal audits and fulfill financial reporting obligations</li>
                <li>Comply with tax and regulatory laws, border control protocols, and airline requirements</li>

              </ul>
            </p>
          </div>

          <div className="terms_item">
            <h2>5. Automated Decision-Making and Profiling</h2>
            <p>
              SkyPort may implement limited profiling or automated decision-making mechanisms in areas such as fraud detection, promotional targeting, and booking pattern analysis. These systems are designed to:<br />
              <ul>
                <li>Detect abnormal or potentially malicious activity</li>
                <li>Ensure secure access to customer accounts</li>
                <li>Customize user experiences (e.g., remembering user preferences)</li>
              </ul><br />
              SkyPort ensures all automated decisions with material consequences are subject to human oversight. You may request a manual review where such automated processing affects you legally or significantly.

            </p>
          </div>

          <div className="terms_item">
            <h2>6.  Data Sharing and Third-Party Disclosures</h2>
            <p>
              SkyPort does not sell, trade, or lease personal data. However, we may disclose data to the following categories of authorized third parties:<br />
              <table className="table-auto border-collapse border border-gray-300 w-full text-sm">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border border-gray-300 px-4 py-2 text-left">
                      Recipient Category
                    </th>
                    <th className="border border-gray-300 px-4 py-2 text-left">
                      Purpose of Disclosure
                    </th>
                    <th className="border border-gray-300 px-4 py-2 text-left">
                      Safeguards in Place
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2">
                      Airlines and Travel Operators
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      Booking fulfillment and passenger manifest submission
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      Binding contracts, data encryption
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2">
                      Payment Service Providers
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      Visa payment processing and billing validation
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      PCI-DSS certified, data tokenization
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2">
                      Legal and Government Authorities
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      Immigration control, customs clearance, regulatory compliance
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      Legal basis, data minimization
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2">
                      IT Infrastructure and Cloud Providers
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      Hosting, analytics, software maintenance
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      DPAs, access control, audit logs
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2">
                      Customer Relationship Vendors
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      Helpdesk ticketing, chat support, feedback collection
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      Confidentiality clauses, limited access
                    </td>
                  </tr>
                </tbody>
              </table>
            </p>
          </div>

          <div className="terms_item">
            <h2>7.  International Data Transfers</h2>
            <p>
              Where personal data is transferred to service providers or affiliates located outside Guyana, SkyPort ensures: - Compliance with data export laws of Guyana - Implementation of Standard Contractual Clauses (SCCs) - Data transfer impact assessments (DTIAs), if required - Technical security measures such as encryption and geo-fencing<br />
              SkyPort will not transfer data to jurisdictions lacking adequate data protection frameworks unless appropriate legal safeguards are in place.

            </p>
          </div>
          <div className="terms_item">
            <h2>8.  Data Retention and Archiving</h2>
            <p>
              SkyPort retains personal data only for the duration necessary to achieve the purposes for which it was collected, or as required by applicable laws and industry standards.<br />
              <table className="table-auto border-collapse border border-gray-300 w-full text-sm">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border border-gray-300 px-4 py-2 text-left">
                      Data Type
                    </th>
                    <th className="border border-gray-300 px-4 py-2 text-left">
                      Retention Period
                    </th>
                    <th className="border border-gray-300 px-4 py-2 text-left">
                      Rationale
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2">Booking Records</td>
                    <td className="border border-gray-300 px-4 py-2">7 years</td>
                    <td className="border border-gray-300 px-4 py-2">
                      Legal, financial, and audit obligations
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2">
                      Payment Information
                    </td>
                    <td className="border border-gray-300 px-4 py-2">7 years</td>
                    <td className="border border-gray-300 px-4 py-2">
                      Anti-fraud, dispute resolution
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2">
                      Customer Communications
                    </td>
                    <td className="border border-gray-300 px-4 py-2">3 years</td>
                    <td className="border border-gray-300 px-4 py-2">
                      Service history, issue resolution
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2">
                      Marketing Preferences
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      Until withdrawn or 5 years
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      Regulatory compliance
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2">
                      Technical Logs
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      12–24 months
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      Security and analytics purposes
                    </td>
                  </tr>
                </tbody>
              </table>
              <br />After expiration, data is securely erased or irreversibly anonymized.


            </p>
          </div>
          <div className="terms_item">
            <h2>9. Your Rights</h2>
            <p>
              As a data subject, you have the following rights under applicable Guyanese data protection laws and internationally recognized privacy frameworks:<br />
              <ul>
                <li><strong>Right to Access:</strong> Obtain confirmation and a copy of personal data held</li>
                <li><strong>Right to Rectification:</strong> Correct inaccurate or incomplete data</li>
                <li><strong>Right to Erasure:</strong> Request deletion of data under certain conditions</li>
                <li><strong>Right to Restrict Processing:</strong> Block further use while accuracy or legality is contested</li>
                <li><strong>Right to Object:</strong> Challenge data processing for marketing or profiling</li>
                <li><strong>Right to Withdraw Consent:</strong> Opt-out of optional processing without penalty</li>
                <li><strong>Right to Data Portability:</strong> Request transmission in a machine-readable format</li>
                <li><strong>Right to Lodge a Complaint:</strong> Submit a complaint to Guyana’s Data Protection Commissioner</li>

              </ul><br />
              All requests should be submitted in writing to <a href="mailto:privacy@skyportdestinations.com">privacy@skyportdestinations.com</a> with proof of identity. SkyPort will respond within the legally mandated timeframe.



            </p>
          </div>
          <div className="terms_item">
            <h2>10. Data Security and Safeguards</h2>
            <p>
              SkyPort employs best-in-class data security protocols, including: - Transport Layer Security (TLS 1.2+) - Role-based access controls and least-privilege policies - Secure hosting infrastructure with DDoS mitigation - Automated vulnerability scanning and patch management - Regular third-party penetration testing - Employee confidentiality training and access restrictions<br />
              Breach notification protocols are in place and comply with applicable legal timelines for disclosure.

            </p>
          </div>
          <div className="terms_item">
            <h2>11. Children’s Privacy</h2>
            <p>
              SkyPort does not knowingly collect or process personal data from individuals under the age of 16 without verifiable parental consent. Where such data is discovered, it is immediately deleted. Users must confirm their eligibility before proceeding with bookings.

            </p>
          </div>
          <div className="terms_item">
            <h2>12. Cookies and Tracking Technologies</h2>
            <p>
              SkyPort uses cookies and equivalent tracking technologies for the following:<br />
              <ul>
                <li>Session authentication and site navigation</li>
                <li>Preference storage and interface personalization</li>
                <li>Analytics via tools such as Google Analytics</li>
                <li>Targeted advertising (if consented)</li>
              </ul><br />
              Users may manage cookie preferences through their browser or opt-out via provided cookie banners. Disabling cookies may impair certain site functionalities.

            </p>
          </div>
          <div className="terms_item">
            <h2>13. Marketing Communications</h2>
            <p>
              SkyPort may send marketing communications to users who have provided prior consent. This includes: - Flight offers, fare reductions, and seasonal promotions - Loyalty programs and referral bonuses - Newsletters and updates on service features<br />
              Users may withdraw consent or opt-out at any time by clicking the unsubscribe link or contacting support.

            </p>
          </div>
          <div className="terms_item">
            <h2>14. External Links and Third-Party Services</h2>
            <p>
              The SkyPort platform may contain links to third-party websites (e.g., airline portals, payment platforms). SkyPort is not responsible for the privacy practices, data handling, or content of those entities. Users are advised to review external privacy policies before submitting data.

            </p>
          </div>
          <div className="terms_item">
            <h2>15. Limitation of Liability</h2>
            <p>
              SkyPort shall not be held liable for: - Data misuse due to user negligence (e.g., shared passwords) - Actions of third-party processors acting outside of agreed scope - Force majeure events including internet outages, natural disasters, or cyberattacks - Data inaccuracies arising from user-provided information

            </p>
          </div>
          <div className="terms_item">
            <h2>16. Policy Amendments</h2>
            <p>
              SkyPort reserves the right to modify this Privacy Policy at any time. Revisions will be effective upon posting with an updated effective date. Where significant changes occur, users will be notified through prominent notices or direct communications.
            </p>
          </div>
          <div className="terms_item">
            <h2>17. Contact and Complaints</h2>
            <p>
              <strong>Data Protection Officer</strong><br />
              SkyPort Destinations<br />
              Georgetown, Guyana<br />
              Email: <a href="mailto:explore@skyportdestinations.com">explore@skyportdestinations.com</a>
            </p>
          </div>
        </Container>
      </section>
    </div>
  );
};

export default PrivacyPolicy;
