import React, { useState, useRef } from "react";
import {
  createWelfareCase,
  uploadWelfareDocuments,
} from "../../../apis/welfareCase";
import {
  Steps,
  Form,
  Input,
  Select,
  Upload,
  Button,
  Card,
  message,
  Modal,
  Spin,
  Radio,
  Space,
  Alert,
  Tooltip,
  Tag,
} from "antd";
import {
  UserOutlined,
  EnvironmentOutlined,
  FileTextOutlined,
  InboxOutlined,
  InfoCircleOutlined,
  FileProtectOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
} from "@ant-design/icons";
import ReCAPTCHA from "react-google-recaptcha";

const { Step } = Steps;
const { TextArea } = Input;
const { Dragger } = Upload;

const DOCUMENT_TYPES = {
  PASSPORT: "Passport",
  VISA: "Visa",
  EMIRATES_ID: "Emirates ID",
  LABOR_CONTRACT: "Labor Contract",
  MEDICAL_REPORT: "Medical Report",
  OTHER: "Other",
};

const CASE_TYPES = {
  VISA_CANCELLATION: "Visa Cancellation",
  PASSPORT_RETENTION: "Passport Retention",
  LABOR_DISPUTE: "Labor Dispute",
  FINANCIAL_EMERGENCY: "Financial Emergency",
  MEDICAL_SUPPORT: "Medical Support",
  LEGAL_ASSISTANCE: "Legal Assistance",
  OTHER: "Other",
};

const URGENCY_LEVELS = {
  LOW: { label: "Low", color: "blue" },
  MEDIUM: { label: "Medium", color: "orange" },
  HIGH: { label: "High", color: "red" },
  CRITICAL: { label: "Critical", color: "purple" },
};

const UAE_EMIRATES = [
  "Abu Dhabi",
  "Dubai",
  "Sharjah",
  "Ajman",
  "Umm Al Quwain",
  "Ras Al Khaimah",
  "Fujairah",
];

const INDIAN_STATES = [
  "Andhra Pradesh",
  "Bihar",
  "Delhi",
  "Gujarat",
  "Karnataka",
  "Kerala",
  "Maharashtra",
  "Tamil Nadu",
  "Uttar Pradesh",
  "West Bengal",
];

const RegistrationFormWelfare = () => {
  const [form] = Form.useForm();
  const [currentStep, setCurrentStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [documents, setDocuments] = useState([]);
  const [referenceNumber, setReferenceNumber] = useState("");
  const [documentUrls, setDocumentUrls] = useState({});
  const captchaRef = useRef(null);
  const [uploadingFiles, setUploadingFiles] = useState({});

  const steps = [
    {
      title: "Personal Information",
      icon: <UserOutlined />,
      subtitle: "Basic details and contact information",
    },
    {
      title: "Location Details",
      icon: <EnvironmentOutlined />,
      subtitle: "UAE and permanent address information",
    },
    {
      title: "Case Information",
      icon: <FileTextOutlined />,
      subtitle: "Case details and supporting documents",
    },
  ];

  const validateCurrentStep = async () => {
    try {
      const currentFields = getCurrentStepFields();
      const allFieldValues = await form.validateFields(currentFields);

      // Check nested fields explicitly
      const values = form.getFieldsValue(true); // Get all form values

      // Validate based on current step
      switch (currentStep) {
        case 0:
          if (!values.mobileUAE?.number || !values.mobileIndia?.number) {
            throw new Error("Please complete all mobile number fields");
          }
          break;
        case 1:
          const requiredAddressFields = [
            "localAddressUAE.building",
            "localAddressUAE.street",
            "localAddressUAE.area",
            "localAddressUAE.emirate",
            "permanentAddress.street",
            "permanentAddress.city",
            "permanentAddress.state",
            "permanentAddress.pincode",
          ];

          for (const field of requiredAddressFields) {
            const value = field
              .split(".")
              .reduce((obj, key) => obj?.[key], values);
            if (!value) {
              throw new Error(`Please complete all address fields`);
            }
          }
          break;
        case 2:
          if (
            !values.caseType ||
            !values.urgencyLevel ||
            !values.caseDescription
          ) {
            throw new Error("Please complete all case information fields");
          }
          break;
      }

      return true;
    } catch (error) {
      message.error(error.message || "Please complete all required fields");
      return false;
    }
  };

  const getCurrentStepFields = () => {
    switch (currentStep) {
      case 0:
        return [
          "fullNameAsPerPassport",
          "passportNumber",
          "emiratesID",
          "email",
          "mobileUAE",
          "mobileIndia",
        ];
      case 1:
        return [
          "visaResidence",
          ["localAddressUAE", "building"],
          ["localAddressUAE", "street"],
          ["localAddressUAE", "area"],
          ["localAddressUAE", "emirate"],
          ["permanentAddress", "street"],
          ["permanentAddress", "city"],
          ["permanentAddress", "state"],
          ["permanentAddress", "pincode"],
          ["permanentAddress", "country"],
        ];
      case 2:
        return ["caseType", "caseDescription", "urgencyLevel"];
      default:
        return [];
    }
  };

  const handleNext = async () => {
    const isValid = await validateCurrentStep();
    if (isValid) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handleSubmit = async () => {
    if (!captchaRef.current?.getValue()) {
      message.error("Please complete the reCAPTCHA verification");
      return;
    }

    try {
      setLoading(true);
      const values = form.getFieldsValue(true);
      await form.validateFields();

      // Format phone numbers as strings
      const formatUAEPhone = (mobile) => {
        if (!mobile?.number) return "";
        return `${mobile.code}${mobile.prefix}${mobile.number}`.replace(
          /\s+/g,
          ""
        );
      };

      const formatIndiaPhone = (mobile) => {
        if (!mobile?.number) return "";
        return `${mobile.code}${mobile.number}`.replace(/\s+/g, "");
      };

      const formattedValues = {
        fullNameAsPerPassport: values.fullNameAsPerPassport?.trim(),
        passportNumber: values.passportNumber?.trim(),
        emiratesID: values.emiratesID?.trim(),
        email: values.email?.trim().toLowerCase(),
        // Convert mobile objects to strings
        mobileUAE: formatUAEPhone(values.mobileUAE),
        mobileIndia: formatIndiaPhone(values.mobileIndia),
        visaResidence: values.visaResidence,
        localAddressUAE: {
          building: values.localAddressUAE?.building?.trim(),
          street: values.localAddressUAE?.street?.trim(),
          area: values.localAddressUAE?.area?.trim(),
          emirate: values.localAddressUAE?.emirate,
        },
        permanentAddress: {
          street: values.permanentAddress?.street?.trim(),
          city: values.permanentAddress?.city?.trim(),
          state: values.permanentAddress?.state,
          pincode: values.permanentAddress?.pincode?.trim(),
          country: "India",
        },
        caseType: values.caseType,
        caseDescription: values.caseDescription?.trim(),
        urgencyLevel: values.urgencyLevel,
        status: "PENDING",
        supportingDocuments: documents.map((doc) => ({
          documentType: doc.documentType,
          documentURL: doc.uploadUrl, // Use the stored URL
          uploadedAt: new Date().toISOString(),
        })),
      };

      // Validate all required fields
      const requiredFields = [
        "fullNameAsPerPassport",
        "passportNumber",
        "emiratesID",
        "email",
        "mobileUAE",
        "mobileIndia",
        "visaResidence",
        "localAddressUAE.building",
        "localAddressUAE.street",
        "localAddressUAE.area",
        "localAddressUAE.emirate",
        "permanentAddress.street",
        "permanentAddress.city",
        "permanentAddress.state",
        "permanentAddress.pincode",
        "caseType",
        "caseDescription",
        "urgencyLevel",
      ];

      for (const field of requiredFields) {
        const value = field
          .split(".")
          .reduce((obj, key) => obj?.[key], formattedValues);
        if (!value) {
          throw new Error(`Missing required field: ${field}`);
        }
      }

      try {
        const response = await createWelfareCase(formattedValues);

        // Set the reference number and show success modal
        setReferenceNumber("WC" + Date.now().toString().slice(-8));
        setShowSuccess(true);
        // form.resetFields();
        setDocuments([]);
        captchaRef.current?.reset();
      } catch (apiError) {
        console.error("API Error:", apiError);
        message.error(
          apiError.response?.data?.message || "Failed to submit the form"
        );
      }
    } catch (error) {
      console.error("Form validation error:", error);
      message.error(error.message || "Please complete all required fields");
    } finally {
      setLoading(false);
    }
  };

  const uploadProps = {
    name: "file",
    multiple: true,
    fileList: documents,
    beforeUpload: (file) => {
      const isValidType = [
        "image/jpeg",
        "image/png",
        "application/pdf",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      ].includes(file.type);

      if (!isValidType) {
        message.error("Only JPG, PNG, PDF, and DOC files are allowed");
        return false;
      }

      const isLt5M = file.size / 1024 / 1024 < 5;
      if (!isLt5M) {
        message.error("File must be smaller than 5MB");
        return false;
      }

      // Add file to uploading state
      setUploadingFiles((prev) => ({
        ...prev,
        [file.uid]: { name: file.name, status: "uploading" },
      }));

      Modal.confirm({
        title: "Select Document Type",
        content: (
          <Select
            style={{ width: "100%" }}
            placeholder="Select document type"
            onChange={async (value) => {
              try {
                const formData = new FormData();
                formData.append("image", file);
                formData.append("documentType", value);

                const tempCaseId = Date.now().toString();

                // Upload the document
                const response = await uploadWelfareDocuments(
                  tempCaseId,
                  formData
                );

                // Update upload status to success
                setUploadingFiles((prev) => ({
                  ...prev,
                  [file.uid]: { name: file.name, status: "success" },
                }));

                // Store document URL and update documents state
                setDocumentUrls((prev) => ({
                  ...prev,
                  [file.uid]: response.data.url,
                }));

                file.documentType = value;
                file.uploadUrl = response.data.url;
                setDocuments((prev) => [...prev, file]);

                // Remove from uploading state after a brief delay to show success
                setTimeout(() => {
                  setUploadingFiles((prev) => {
                    const newState = { ...prev };
                    delete newState[file.uid];
                    return newState;
                  });
                }, 1500);

                message.success(`${file.name} uploaded successfully`);
              } catch (error) {
                // Update upload status to error
                setUploadingFiles((prev) => ({
                  ...prev,
                  [file.uid]: { name: file.name, status: "error" },
                }));

                console.error("Upload error:", error);
                message.error(
                  error.response?.data?.message ||
                    "Failed to upload document. Please try again."
                );

                // Remove from uploading state after showing error
                setTimeout(() => {
                  setUploadingFiles((prev) => {
                    const newState = { ...prev };
                    delete newState[file.uid];
                    return newState;
                  });
                }, 3000);
              }
            }}
          >
            {Object.entries(DOCUMENT_TYPES).map(([key, value]) => (
              <Select.Option key={key} value={key}>
                {value}
              </Select.Option>
            ))}
          </Select>
        ),
        okText: "Add Document",
        cancelText: "Cancel",
        onOk: () => {
          if (!file.documentType) {
            message.error("Please select a document type");
            return Promise.reject();
          }
          return Promise.resolve();
        },
        onCancel: () => {
          // Remove from uploading state if cancelled
          setUploadingFiles((prev) => {
            const newState = { ...prev };
            delete newState[file.uid];
            return newState;
          });
        },
      });

      return false;
    },
    onRemove: (file) => {
      setDocuments(documents.filter((item) => item.uid !== file.uid));
      setDocumentUrls((prev) => {
        const newUrls = { ...prev };
        delete newUrls[file.uid];
        return newUrls;
      });
    },
  };

  const renderPersonalInfo = () => (
    <div className="welfare-registration-section welfare-registration-section--personal">
      <Alert
        message="Important Note"
        description="Please ensure all information matches your official documents."
        type="info"
        showIcon
        className="welfare-registration-alert welfare-registration-alert-info"
      />

      <Form.Item
        name="fullNameAsPerPassport"
        label="Full Name (As per Passport)"
        className="welfare-registration-input"
        rules={[{ required: true, message: "Please enter your full name" }]}
      >
        <Input
          placeholder="Enter your full name"
          className="welfare-registration-input--base"
        />
      </Form.Item>

      <Form.Item
        name="passportNumber"
        label="Passport Number"
        className="welfare-registration-input"
        rules={[
          { required: true, message: "Please enter your passport number" },
        ]}
      >
        <Input
          placeholder="Enter passport number"
          className="welfare-registration-input--base"
        />
      </Form.Item>

      <Form.Item
        name="emiratesID"
        label="Emirates ID"
        className="welfare-registration-input"
        rules={[
          { required: true, message: "Please enter your Emirates ID" },
          {
            pattern: /^\d{3}-\d{4}-\d{7}-\d{1}$/,
            message:
              "Please enter a valid Emirates ID format (XXX-XXXX-XXXXXXX-X)",
          },
        ]}
      >
        <Input
          placeholder="XXX-XXXX-XXXXXXX-X"
          className="welfare-registration-input--base"
        />
      </Form.Item>

      <Form.Item
        name="email"
        label="Email"
        className="welfare-registration-input"
        rules={[
          { required: true, message: "Please enter your email" },
          { type: "email", message: "Please enter a valid email" },
        ]}
      >
        <Input
          placeholder="Enter your email address"
          className="welfare-registration-input--base"
        />
      </Form.Item>

      <Space className="w-full" size="large">
        {/* UAE Mobile Number */}
        <Form.Item label="UAE Mobile Number" required>
          <Space>
            {/* UAE Country Code */}
            <Form.Item name={["mobileUAE", "code"]} noStyle initialValue="+971">
              <Input style={{ width: 60 }} disabled />
            </Form.Item>

            {/* UAE Number Prefix */}
            <Form.Item name={["mobileUAE", "prefix"]} noStyle initialValue="50">
              <Select style={{ width: 100 }}>
                <Select.Option value="50">50</Select.Option>
                <Select.Option value="52">52</Select.Option>
                <Select.Option value="54">54</Select.Option>
                <Select.Option value="55">55</Select.Option>
                <Select.Option value="56">56</Select.Option>
                <Select.Option value="58">58</Select.Option>
              </Select>
            </Form.Item>

            {/* UAE Mobile Number */}
            <Form.Item
              name={["mobileUAE", "number"]}
              noStyle
              rules={[
                {
                  required: true,
                  message: "Please enter your UAE mobile number",
                },
                {
                  pattern: /^[0-9]{7}$/,
                  message: "Please enter exactly 7 digits",
                },
              ]}
            >
              <Input
                style={{ width: 200 }}
                placeholder="Enter mobile number"
                maxLength={7}
                onKeyPress={(e) => {
                  const charCode = e.which ? e.which : e.keyCode;
                  if (charCode < 48 || charCode > 57) {
                    e.preventDefault();
                  }
                }}
                onChange={(e) => {
                  const value = e.target.value.replace(/[^\d]/g, "");
                  e.target.value = value;
                }}
              />
            </Form.Item>
          </Space>
        </Form.Item>

        {/* India Mobile Number */}
        <Form.Item label="India Mobile Number" required>
          <Space>
            {/* India Country Code */}
            <Form.Item
              name={["mobileIndia", "code"]}
              noStyle
              initialValue="+91"
            >
              <Input style={{ width: 60 }} disabled />
            </Form.Item>

            {/* India Mobile Number */}
            <Form.Item
              name={["mobileIndia", "number"]}
              noStyle
              rules={[
                {
                  required: true,
                  message: "Please enter your India mobile number",
                },
                {
                  pattern: /^[0-9]{10}$/,
                  message: "Please enter exactly 10 digits",
                },
              ]}
            >
              <Input
                style={{ width: 200 }}
                placeholder="Enter mobile number"
                maxLength={10}
                onKeyPress={(e) => {
                  const charCode = e.which ? e.which : e.keyCode;
                  if (charCode < 48 || charCode > 57) {
                    e.preventDefault();
                  }
                }}
                onChange={(e) => {
                  const value = e.target.value.replace(/[^\d]/g, "");
                  e.target.value = value;
                }}
              />
            </Form.Item>
          </Space>
        </Form.Item>
      </Space>
    </div>
  );

  const renderLocationDetails = () => (
    <div className="location-details-section">
      <Form.Item
        name="visaResidence"
        label="Visa Residence Emirate"
        rules={[
          { required: true, message: "Please select visa residence emirate" },
        ]}
      >
        <Select placeholder="Select emirate">
          {UAE_EMIRATES.map((emirate) => (
            <Select.Option key={emirate} value={emirate}>
              {emirate}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>

      <div className="mb-6">
        <h3 className="text-lg font-medium mb-4">UAE Address</h3>
        <Form.Item
          name={["localAddressUAE", "building"]}
          label="Building Name/Number"
          rules={[
            { required: true, message: "Please enter building name/number" },
          ]}
        >
          <Input placeholder="Enter building name or number" />
        </Form.Item>

        <Form.Item
          name={["localAddressUAE", "street"]}
          label="Street"
          rules={[{ required: true, message: "Please enter street name" }]}
        >
          <Input placeholder="Enter street name" />
        </Form.Item>

        <Form.Item
          name={["localAddressUAE", "area"]}
          label="Area"
          rules={[{ required: true, message: "Please enter area name" }]}
        >
          <Input placeholder="Enter area name" />
        </Form.Item>

        <Form.Item
          name={["localAddressUAE", "emirate"]}
          label="Current Emirate"
          rules={[{ required: true, message: "Please select current emirate" }]}
        >
          <Select placeholder="Select emirate">
            {UAE_EMIRATES.map((emirate) => (
              <Select.Option key={emirate} value={emirate}>
                {emirate}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
      </div>

      <div>
        <h3 className="text-lg font-medium mb-4">Permanent Address (India)</h3>
        <Form.Item
          name={["permanentAddress", "street"]}
          label="Street/Village"
          rules={[
            { required: true, message: "Please enter street/village name" },
          ]}
        >
          <Input placeholder="Enter street/village name" />
        </Form.Item>

        <Form.Item
          name={["permanentAddress", "city"]}
          label="City/District"
          rules={[{ required: true, message: "Please enter city/district" }]}
        >
          <Input placeholder="Enter city/district" />
        </Form.Item>

        <Form.Item
          name={["permanentAddress", "state"]}
          label="State"
          rules={[{ required: true, message: "Please select state" }]}
        >
          <Select placeholder="Select state">
            {INDIAN_STATES.map((state) => (
              <Select.Option key={state} value={state}>
                {state}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        {/* Pin Code  */}

        <Form.Item
          name={["permanentAddress", "pincode"]}
          label="Pincode"
          rules={[
            { required: true, message: "Please enter pincode" },
            {
              pattern: /^\d{6}$/,
              message: "Please enter a valid 6-digit pincode",
            },
          ]}
        >
          <Input
            placeholder="Enter pincode"
            maxLength={6}
            onInput={(e) => {
              e.target.value = e.target.value.replace(/[^0-9]/g, ""); // Allow only numbers
            }}
          />
        </Form.Item>

        <Form.Item
          name={["permanentAddress", "country"]}
          initialValue="India"
          hidden
        >
          <Input />
        </Form.Item>
      </div>
    </div>
  );

  const renderCaseInformation = () => (
    <div className="case-information-section">
      {/* Case Type */}
      <Form.Item
        name="caseType"
        label="Case Type"
        rules={[{ required: true, message: "Please select case type" }]}
      >
        <Select placeholder="Select case type">
          {Object.entries(CASE_TYPES).map(([key, value]) => (
            <Select.Option key={key} value={key}>
              {value}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>

      {/* Urgency Level */}

      <Form.Item
        name="urgencyLevel"
        label="Urgency Level"
        rules={[{ required: true, message: "Please select urgency level" }]}
        initialValue="MEDIUM"
      >
        <Radio.Group>
          {Object.entries(URGENCY_LEVELS).map(([key, { label, color }]) => (
            <Radio.Button key={key} value={key}>
              <Tag color={color}>{label}</Tag>
            </Radio.Button>
          ))}
        </Radio.Group>
      </Form.Item>

      {/* Case Description */}

      <Form.Item
        name="caseDescription"
        label={
          <span>
            Case Description
            <Tooltip title="Please provide detailed information about your case, including background, current situation, and specific assistance needed.">
              <InfoCircleOutlined className="ml-1" />
            </Tooltip>
          </span>
        }
        rules={[
          { required: true, message: "Please provide case description" },
          { min: 100, message: "Please provide at least 100 characters" },
        ]}
      >
        <TextArea
          rows={6}
          placeholder="Please provide detailed information about your case..."
          maxLength={2000}
          showCount
        />
      </Form.Item>

      {/* Uploaded Section */}

      <Form.Item
        label={
          <span>
            Supporting Documents
            <Tooltip title="Please upload relevant documents to support your case (Passport copy, Emirates ID, relevant contracts, etc.)">
              <InfoCircleOutlined className="ml-1" />
            </Tooltip>
          </span>
        }
      >
        <Dragger {...uploadProps}>
          <p className="ant-upload-drag-icon">
            <InboxOutlined />
          </p>
          <p className="ant-upload-text">Click or drag files to upload</p>
          <p className="ant-upload-hint">
            Supported formats: JPG, PNG, PDF, DOC, DOCX (Max: 5MB per file)
          </p>
        </Dragger>

        {/* Uploading Files Section */}
        {Object.keys(uploadingFiles).length > 0 && (
          <div className="mt-4">
            {Object.entries(uploadingFiles).map(([uid, { name, status }]) => (
              <div key={uid} className="mb-2 flex items-center">
                <Space>
                  {status === "uploading" && <Spin size="small" />}
                  {status === "success" && (
                    <CheckCircleOutlined className="text-green-500" />
                  )}
                  {status === "error" && (
                    <CloseCircleOutlined className="text-red-500" />
                  )}
                  <span
                    className={`
              ${status === "success" ? "text-green-600" : ""}
              ${status === "error" ? "text-red-600" : ""}
            `}
                  >
                    {name} -{" "}
                    {status === "uploading"
                      ? "Uploading..."
                      : status === "success"
                      ? "Upload Complete"
                      : "Upload Failed"}
                  </span>
                </Space>
              </div>
            ))}
          </div>
        )}

        {/* Uploaded Documents Section */}
        {documents.length > 0 && (
          <div className="mt-4">
            <h4 className="mb-2 font-medium">Uploaded Documents:</h4>
            {documents.map((file, index) => (
              <Tag
                key={index}
                closable
                onClose={() => {
                  const newDocs = [...documents];
                  newDocs.splice(index, 1);
                  setDocuments(newDocs);
                }}
                className="mb-2 mr-2"
                color="blue"
              >
                <Space>
                  <FileProtectOutlined />
                  {DOCUMENT_TYPES[file.documentType]}: {file.name}
                </Space>
              </Tag>
            ))}
          </div>
        )}
      </Form.Item>
      <Form.Item>
        <Alert
          message="Privacy Notice"
          description={
            <>
              By submitting this form, you agree to our{" "}
              <a
                href="/information/privacy-policy"
                target="_blank"
                rel="noopener noreferrer"
              >
                privacy policy
              </a>{" "}
              and consent to the processing of your personal information for the
              purpose of providing welfare support.
            </>
          }
          type="warning"
          showIcon
          className="mb-6"
        />
      </Form.Item>
      <Form.Item>
        <ReCAPTCHA
          ref={captchaRef}
          sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
        />
      </Form.Item>
    </div>
  );

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 0:
        return renderPersonalInfo();
      case 1:
        return renderLocationDetails();
      case 2:
        return renderCaseInformation();
      default:
        return null;
    }
  };

  return (
    <Spin spinning={loading} tip="Processing your submission...">
      <Card className="welfare-registration-form">
        <div className="mb-8">
          <Steps current={currentStep}>
            {steps.map((step, index) => (
              <Step
                key={index}
                title={step.title}
                description={step.subtitle}
                icon={step.icon}
              />
            ))}
          </Steps>
        </div>

        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          scrollToFirstError
        >
          {renderCurrentStep()}

          <div className="steps-action mt-8 flex justify-between">
            {currentStep > 0 && (
              <Button onClick={() => setCurrentStep((prev) => prev - 1)}>
                Previous
              </Button>
            )}

            {currentStep < steps.length - 1 ? (
              <Button
                type="primary"
                onClick={handleNext}
                className={currentStep === 0 ? "ml-auto" : ""}
              >
                Next
              </Button>
            ) : (
              <Button
                type="primary"
                onClick={() => form.submit()}
                disabled={loading}
              >
                Submit Case
              </Button>
            )}
          </div>
        </Form>

        <Modal
          open={showSuccess}
          footer={null}
          onCancel={() => setShowSuccess(false)}
          width={500}
          centered
        >
          <div className="text-center">
            <CheckCircleOutlined className="text-6xl text-green-500 mb-4" />
            <h3 className="text-xl font-semibold mb-2">
              Case Submitted Successfully
            </h3>
            <p className="text-gray-600 mb-4">
              Your case has been registered successfully. Please save your
              reference number for future correspondence.
            </p>
            <div className="bg-gray-50 p-4 rounded-lg mb-4">
              <p className="text-sm text-gray-500">Reference Number</p>
              <p className="text-xl font-mono font-bold">{referenceNumber}</p>
            </div>
            <Button type="primary" onClick={() => setShowSuccess(false)} block>
              Close
            </Button>
          </div>
        </Modal>
      </Card>
    </Spin>
  );
};

export default RegistrationFormWelfare;
