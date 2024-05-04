# Fintastic

### Overview

Welcome to FINTastic, a cutting-edge Financial Management Platform designed to revolutionize how individuals manage their finances. Our platform addresses common challenges such as disorganization, limited visibility into spending patterns, and the complexity of financial decision-making. FINTastic offers a comprehensive suite of tools including expense tracking, budget planning, and goal setting, all wrapped in an intuitive and user-friendly interface. With a focus on data security, insightful analytics, and personalized financial solutions, FINTastic empowers users to take control of their financial well-being with confidence and ease.


* *Date Created*: 29 Jan 2024
* *Last Modification Date*: 12 April 2024
* *Deployed website URL*: <https://fintastic-grp-14.netlify.app/home>
* *Git URL*: <https://git.cs.dal.ca/gosaliya/CSCI-5709-Grp-14>

* *Group 14 main branch Git URL*: <https://git.cs.dal.ca/gosaliya/CSCI-5709-Grp-14.git>

## Group members GIT URLs
* *Group 14 Bhargav branch Git URL*: <https://git.cs.dal.ca/gosaliya/CSCI-5709-Grp-14/-/tree/Bhargav-Kanodiya?ref_type=heads>
* *Group 14 Dhrumil branch Git URL*: <https://git.cs.dal.ca/gosaliya/CSCI-5709-Grp-14/-/tree/dhrumil-gosaliya?ref_type=heads>
* *Group 14 Raman branch Git URL*: <https://git.cs.dal.ca/gosaliya/CSCI-5709-Grp-14/-/tree/feature-ramandeepkaur?ref_type=heads>
* *Group 14 Vishnu branch Git URL*: <https://git.cs.dal.ca/gosaliya/CSCI-5709-Grp-14/-/tree/vishnu?ref_type=heads>
* *Group 14 Shreya branch Git URL*: <https://git.cs.dal.ca/gosaliya/CSCI-5709-Grp-14/-/tree/shreya-kapoor?ref_type=heads>
* *Group 14 Jaskaran Singh branch Git URL*: <https://git.cs.dal.ca/gosaliya/CSCI-5709-Grp-14/-/tree/jaskaran-singh?ref_type=heads>


## Author
* [Bhargav Kanodiya](bh950065@dal.ca) - *(Developer)*
* [Dhrumil Gosaliya](dh411197@dal.ca) - *(Developer)*
* [Ramandeep Kaur](rm661081@dal.ca) - *(Developer)*
* [Vishnu Narayanbhai Vasita](vs369825@dal.ca) - *(Developer)*
* [Shreya Kapoor](sh820878@dal.ca) - *(Developer)*
* [Jaskaran Singh](js356337@dal.ca) - *(Developer)*

## Deployment

We created a mirror repository on github from gitlab and deployed on netlify. Configued the built settings of Netlify as required and the website is live on above URL.For deployment of backend we have used render which is live on given backend url.

* *Frontend URL*: <https://fintastic-grp-14.netlify.app/home>
* *Backend URL*: <https://web-grp-14.onrender.com/>

## Built With

* [React](https://legacy.reactjs.org/docs/getting-started.html/) - The web framework used
* [npm](https://docs.npmjs.com//) - Dependency Management
* [MaterialUi](https://mui.com/material-ui/) - Material UI is an open-source React component library
* [Nodejs](https://nodejs.org/en) - Javascript Runtime Enviornment
* [MongoDB](https://www.mongodb.com/) - Document Based NoSQL Database
* [Expressjs](https://expressjs.com/) - Nodejs Framework for running server
* [Mongoose](https://www.mongodb.com/developer/languages/javascript/getting-started-with-mongodb-and-mongoose/) - ODM For DB connection and Operations
* [antd](https://ant.design/) - Design Framework for Form Inputs
* [jwt](https://jwt.io/) - Token Manager for Secure Authentication
* [SweetAlert2](https://sweetalert2.github.io/) - A BEAUTIFUL, RESPONSIVE, CUSTOMIZABLE, ACCESSIBLE (WAI-ARIA) REPLACEMENT FOR JAVASCRIPT'S POPUP BOXES
* [FullCalendar](https://fullcalendar.io/) - FullCalendar provides a highly performant React component that accepts JSX for rendering nested content 

## Sources Used

### budget-planner.js

*Lines 130 - 137*

```
    {/* Pie chart */}
        <PieChart
          series={[{ data: chartData }]}
          width={500}
          height={230}
          labelAccessor={({ dataEntry }) => `${dataEntry.value}%`}
        />
```

The code above was created by adapting the code in [Charts - Pie](https://mui.com/x/react-charts/pie/#basics) as shown below: 

```
import * as React from 'react';
import { PieChart } from '@mui/x-charts/PieChart';

export default function BasicPie() {
  return (
    <PieChart
      series={[
        {
          data: [
            { id: 0, value: 10, label: 'series A' },
            { id: 1, value: 15, label: 'series B' },
            { id: 2, value: 20, label: 'series C' },
          ],
        },
      ]}
      width={400}
      height={200}
    />
  );
}

```

*Lines 140 - 167*

```
    <Stack spacing={2}>
        <Box sx={{ display: "flex", flexWrap: "wrap" }}>
          {chartData.map((category, index) => (
            <Card
              key={category.id}
              style={{
                marginRight: "30px",
                marginBottom: "10px",
                width: "23%",
              }}
            >
              <CardContent>
                <Typography variant="h5">{category.label}</Typography>
                <Typography>
                  Budget: {category.value}% equals to $
                  {(category.value / 100) * monthlySalary}
                </Typography>
                <IconButton onClick={() => handleEdit(index)}>
                  <EditIcon />
                </IconButton>
                <IconButton onClick={() => handleDelete(index)}>
                  <DeleteIcon />
                </IconButton>
              </CardContent>
            </Card>
          ))}
        </Box>
      </Stack>
```

The code above was created by adapting the code in [Cards - Media](https://mui.com/material-ui/react-card/#basics) as shown below: 

```
import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

export default function MediaCard() {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        sx={{ height: 140 }}
        image="/static/images/cards/contemplative-reptile.jpg"
        title="green iguana"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          Lizard
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Lizards are a widespread group of squamate reptiles, with over 6,000
          species, ranging across all continents except Antarctica
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Share</Button>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
  );
}

```



### navbar.js

*Lines 26 - 121*

```
    export default function Navbar(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const container =
    window !== undefined ? () => window().document.body : undefined;

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Typography variant="h5" sx={{ my: 2 }}>
        FINtastic
      </Typography>
      <Divider />
      <List>
        {navItems.map((item) => (
          <ListItem key={item.title} disablePadding>
            <ListItemButton sx={{ textAlign: "center" }}>
              <ListItemText>
                <Link
                  style={{ textDecoration: "none", color: "black" }}
                  to={item.path}
                >
                  {item.title}
                </Link>
              </ListItemText>
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <Box sx={{ display: "flex" }}>
      <AppBar component="nav" style={{ background: "#4c4b42" }}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h5"
            component="div"
            sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
          >
            FINtastic
          </Typography>
          <Box sx={{ display: { xs: "none", sm: "block" } }}>
            {navItems.map((item) => (
              <Button key={item.title}>
                <Link
                  style={{ textDecoration: "none", color: "white" }}
                  to={item.path}
                >
                  {item.title}
                </Link>
              </Button>
            ))}
          </Box>
        </Toolbar>
      </AppBar>
      <nav>
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
      </nav>
      <Box component="main">
        <Toolbar />
      </Box>
    </Box>
  );
}



```

The code above was created by material UI App bar (https://mui.com/material-ui/react-app-bar/)

### AddExpense.js

*Lines 35-115*

```
<div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh' }}>
      <Form
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 12,
        }}
        layout="horizontal"
        style={{
          width: '40%',
          padding: '40px',
          borderRadius: '8px',
          boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
          backgroundColor: '#f9f9f9',
        }}
      >
        <div style={{ textAlign: 'center', marginBottom: '20px' }}>
          <Title style={{ color: '#1890ff' }}>Add Expense</Title>
        </div>
        <Form.Item label="Enter Amount">
          <InputNumber style={{ width: '100%' }} />
        </Form.Item>
        <Form.Item label="Expense Type">
          <Radio.Group>
            <Radio value="paid"> Paid </Radio>
            <Radio value="received"> Received </Radio>
          </Radio.Group>
        </Form.Item>

        <Form.Item label="Payment Medium">
          <Select style={{ width: '100%' }}>
            <Select.Option value="Credit">Credit Card</Select.Option>
            <Select.Option value="Debit">Debit Card/Bank AC</Select.Option>
            <Select.Option value="Cash">Cash</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item label="Date">
          <DatePicker style={{ width: '100%' }} />
        </Form.Item>
        <Form.Item label="Description">
          <TextArea rows={4} style={{ width: '100%' }} />
        </Form.Item>
        <Form.Item label="Upload" valuePropName="fileList" getValueFromEvent={normFile}>
          <Upload action="/upload.do" listType="picture-card">
            <button
              style={{
                border: 0,
                background: 'none',
              }}
              type="button"
            >
              <PlusOutlined />
              <div
                style={{
                  marginTop: 8,
                }}
              >
                Upload
              </div>
            </button>
          </Upload>
        </Form.Item>
        <Form.Item label="Category">
          <Select style={{ width: '100%' }}>
            <Select.Option value="entertainment">Entertainment</Select.Option>
            <Select.Option value="food">Food</Select.Option>
            <Select.Option value="rent">Rent</Select.Option>
            <Select.Option value="car">Car</Select.Option>
            <Select.Option value="insurance">Insurance</Select.Option>
            <Select.Option value="grocery">Grocery</Select.Option>
            <Select.Option value="travel">Travel</Select.Option>
            <Select.Option value="technology">Technology</Select.Option>
            <Select.Option value="other">Other</Select.Option>
          </Select>
        </Form.Item>
        <div style={{ textAlign: 'center', marginTop: '20px' }}>
          <Button type="primary" onClick={successNotification}>Submit</Button>
        </div>
      </Form>
    </div>
```
This code was adapted from the [Ant Design 5.0 Help designers developers building beautiful products more flexible and working with happiness](https://ant.design/components/overview/) as shown below:

```
import React, { useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import {
  Button,
  Cascader,
  Checkbox,
  ColorPicker,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Radio,
  Select,
  Slider,
  Switch,
  TreeSelect,
  Upload,
} from 'antd';
const { RangePicker } = DatePicker;
const { TextArea } = Input;
const normFile = (e) => {
  if (Array.isArray(e)) {
    return e;
  }
  return e?.fileList;
};
const FormDisabledDemo = () => {
  const [componentDisabled, setComponentDisabled] = useState(true);
  return (
    <>
      <Checkbox
        checked={componentDisabled}
        onChange={(e) => setComponentDisabled(e.target.checked)}
      >
        Form disabled
      </Checkbox>
      <Form
        labelCol={{
          span: 4,
        }}
        wrapperCol={{
          span: 14,
        }}
        layout="horizontal"
        disabled={componentDisabled}
        style={{
          maxWidth: 600,
        }}
      >
        <Form.Item label="Checkbox" name="disabled" valuePropName="checked">
          <Checkbox>Checkbox</Checkbox>
        </Form.Item>
        <Form.Item label="Radio">
          <Radio.Group>
            <Radio value="apple"> Apple </Radio>
            <Radio value="pear"> Pear </Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item label="Input">
          <Input />
        </Form.Item>
        <Form.Item label="Select">
          <Select>
            <Select.Option value="demo">Demo</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item label="TreeSelect">
          <TreeSelect
            treeData={[
              {
                title: 'Light',
                value: 'light',
                children: [
                  {
                    title: 'Bamboo',
                    value: 'bamboo',
                  },
                ],
              },
            ]}
          />
        </Form.Item>
        <Form.Item label="Cascader">
          <Cascader
            options={[
              {
                value: 'zhejiang',
                label: 'Zhejiang',
                children: [
                  {
                    value: 'hangzhou',
                    label: 'Hangzhou',
                  },
                ],
              },
            ]}
          />
        </Form.Item>
        <Form.Item label="DatePicker">
          <DatePicker />
        </Form.Item>
        <Form.Item label="RangePicker">
          <RangePicker />
        </Form.Item>
        <Form.Item label="InputNumber">
          <InputNumber />
        </Form.Item>
        <Form.Item label="TextArea">
          <TextArea rows={4} />
        </Form.Item>
        <Form.Item label="Switch" valuePropName="checked">
          <Switch />
        </Form.Item>
        <Form.Item label="Upload" valuePropName="fileList" getValueFromEvent={normFile}>
          <Upload action="/upload.do" listType="picture-card">
            <button
              style={{
                border: 0,
                background: 'none',
              }}
              type="button"
            >
              <PlusOutlined />
              <div
                style={{
                  marginTop: 8,
                }}
              >
                Upload
              </div>
            </button>
          </Upload>
        </Form.Item>
        <Form.Item label="Button">
          <Button>Button</Button>
        </Form.Item>
        <Form.Item label="Slider">
          <Slider />
        </Form.Item>
        <Form.Item label="ColorPicker">
          <ColorPicker />
        </Form.Item>
      </Form>
    </>
  );
};
export default () => <FormDisabledDemo />;
```

- The Code on the source [Antd Form Components](https://ant.design/components/form) was implemented extensively for various inputs to take from user in userfriendly way.
- I used [Antd Form Components](https://ant.design/components/form)'s Code because it has really great clean looking UI template with many input options and It is really easy to Implement.
- I have modified [Antd Form Components](https://ant.design/components/form)'s code in such a way that I can make all the personalized options as per our project's requirment and changed it accordingly and only took the part of the code which is necessary for our project.

### AddExpense.js

*Lines 25-31*

```
const successNotification=()=>{
    Swal.fire({
        title: "Expense Added",
        text: "Expense has been added successfully!",
        icon: "success"
      });
}
```
The Code above was adapted from [Sweetalert2](https://sweetalert2.github.io/#declarative-templates) to make attractive alert messages to the User as below.

```
Swal.fire({
  title: "Good job!",
  text: "You clicked the button!",
  icon: "success"
});
```
- The Code in [Sweetalert2](https://sweetalert2.github.io/#declarative-templates) are implemented to make alerts more efficient and user friendly.
- I used [Sweetalert2](https://sweetalert2.github.io/#declarative-templates) because it has easy installation and implementation.
- I modified [Sweetalert2](https://sweetalert2.github.io/#declarative-templates)'s code by replacing simple messages to my requirements.

### LandingPage.js

- Image used (https://unsplash.com/photos/turned-on-black-and-grey-laptop-computer-mcSDtbWXUZU)
- Image used (https://unsplash.com/photos/person-holding-pencil-near-laptop-computer-5fNmWej4tAA)

### Faq.js

- Image used (https://nomadevents.com/faq/faq-banner/)
- Image used (https://www.upuntilnow.ca/pages/contact-us)


### login.js
*Lines 15-28*

```
const successNotification = (message) => {
    Swal.fire({
      title: "Logged in successful!",
      text: message,
      icon: "success"
    });
  }
  const errorNotification = (message) => {
    Swal.fire({
        title: "Log in Failed!",
        text: message,
        icon: "error"
    })
}
```
- The Code in [Sweetalert2](https://sweetalert2.github.io/#declarative-templates) are implemented to make alerts more efficient and user friendly.
- I used [Sweetalert2](https://sweetalert2.github.io/#declarative-templates) because it has easy installation and implementation.
### Calendar.js
*Lines 158-173*
```
<FullCalendar
          plugins={[dayGridPlugin, interactionPlugin]}
          initialView='dayGridMonth'
          weekends={true}
          events={events}
          eventContent={renderEventContent}
          dateClick={handleDateClick}
          eventClick={handleEventClick}
          editable={true}
          height="100vh"
          headerToolbar={{
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth',
          }}
        />
```
- The Code in [FullCalendar](https://fullcalendar.io/) is implemented to show Calendar and events to the User.
- We used [FullCalendar](https://fullcalendar.io/) to implement Calendar view to show expenses and reminders to the User on the Calendar.

### signup.js

*Lines 30-43*

```
const successNotification = (message) => {
    Swal.fire({
      title: "Signed up successfully!",
      text: message,
      icon: "success"
    });
  }
  const errorNotification = (message) => {
    Swal.fire({
        title: "Signup failed!",
        text: message,
        icon: "error"
    })
}
```
- The Code in [Sweetalert2](https://sweetalert2.github.io/#declarative-templates) are implemented to make alerts more efficient and user friendly.
- I used [Sweetalert2](https://sweetalert2.github.io/#declarative-templates) because it has easy installation and implementation.

### userProfile.js

- Image used (https://stock.adobe.com/search?k=%22user+icon%22)


### Dashboard Component

#### Code Adaptation

_Lines 1 - 190_

```
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Grid, Typography, Paper } from "@mui/material";
import { PieChart } from "react-minimal-pie-chart";

// Function components and hooks for managing expenses summary
const ExpenseSummary = () => {
  // State variables for managing expenses data
  const [expenses, setExpenses] = useState([]);

  // Effect hook to fetch expenses data from the backend
  useEffect(() => {
    const token = localStorage.getItem("token");

    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/expense/getall`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setExpenses(response.data.expenses);
      })
      .catch((error) => {
        console.error("Error fetching expenses:", error);
      });
  }, []);

  // Functions to calculate weekly and monthly expenditure
  const calculateWeeklyTotal = () => {
    // Calculate total spent in a week
    // ...
  };

  const calculateMonthlyTotal = () => {
    // Calculate total spent in a month
    // ...
  };

  // Function to generate data for the pie chart
  const generateChartData = () => {
    // Generate data for the pie chart
    // ...
  };

  // Function to generate a random color for the pie chart
  const getRandomColor = () => {
    // Generate a random color
    // ...
  };

  // Return JSX for rendering the expense summary dashboard
  return (
    <div style={{ flexGrow: 1 }}>
      {/* Grid layout for dashboard components */}
      <Grid container spacing={3}>
        {/* Weekly expenditure section */}
        <Grid item xs={6}>
          {/* Paper component for styling */}
          <Paper style={{ padding: 8, textAlign: "center", color: "rgba(0, 0, 0, 0.87)" }}>
            <Typography variant="h6">Weekly Expenditure</Typography>
            <Typography>Total Spent: {calculateWeeklyTotal()}</Typography>
            {/* Additional components for displaying weekly data */}
            {/* ... */}
          </Paper>
        </Grid>
        {/* Monthly expenditure section */}
        <Grid item xs={6}>
          {/* Paper component for styling */}
          <Paper style={{ padding: 8, textAlign: "center", color: "rgba(0, 0, 0, 0.87)" }}>
            <Typography variant="h6">Monthly Expenditure</Typography>
            <Typography>Total Spent: {calculateMonthlyTotal()}</Typography>
            {/* Additional components for displaying monthly data */}
            {/* ... */}
          </Paper>
        </Grid>
        {/* Pie chart section */}
        <Grid item xs={6}>
          {/* Paper component for styling */}
          <Paper style={{ padding: 8 }}>
            {/* Components for displaying pie chart */}
            {/* ... */}
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};

// Export the ExpenseSummary component
export default ExpenseSummary;
```

The code above was created by adapting the code from the provided source and integrating it into our React application.

### notificationController.js

*Line 5 - 24*

```
const createSingleNotification = async (req, res) => {
    try {
        const { message, notificationType } = req.body;
        const userId = req.user.userId;
        let newNotification = new NotificationModel({
            userId,
            message,
            notificationType,
            isRead: false, 
            isDeleted: false 
        });

        const savedNotification = await newNotification.save();
        return res.status(200).send({
            savedNotification
        });
    } catch (err) {
        throw new Error(err.message);
    }
};
```

*Line 26 - 36*

```
const getAllNotifications = async (req, res) => {
    try {
        const userId = req.user.userId; 
        const notifications = await NotificationModel.find({ userId, isDeleted: false }).sort({ createdAt: -1 });
        return res.status(200).send({
            notifications
        });
    } catch (err) {
        throw new Error(err.message);
    }
};
```

The code above was created by adapting the code in [Register a User:](https://devendrajohari9.medium.com/nodejs-authentication-authorisation-ee04ff744c80) as shown below:

```
exports.registerUser = catchAsyncErrors(async(req, res, next) => {
    const {name, email, password} = req.body;
    console.log(name);
    const user = await User.create({
        name, email, password,
        avatar: {
            public_id: "This is sample id",
            url: "ProfilePicUrl"
        }
    });

    sendToken(user, 201, res);
});
```

### notificationModel.js

*Line 3 - 35*

```
let mongoose = require("mongoose");
let Schema = mongoose.Schema;
const { ObjectId } = require("bson");

let notificationSchema = new Schema({
    userId: {
        type: ObjectId,
        required: true
    },
    message: {
        type: String,
        required: true
    },
    notificationType: {
        type: String,
        required: true
    },
    isRead: {
        type: Boolean,
        required: true,
        default: false
    },
    isDeleted: {
        type: Boolean,
        required: true,
        default: false
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now
    }
});
```
The code above was created by adapting the code in [The type Key](https://mongoosejs.com/docs/schematypes.html) as shown below:

```
const schema = new Schema({
  name: { type: String },
  nested: {
    firstName: { type: String },
    lastName: { type: String }
  }
});
```

### notificationRoutes.js

*Line 8 - 9*
```
router.post('/create', userAuth, createSingleNotification);
router.get('/get-all', userAuth, getAllNotifications);
```
The code above was created by adapting the code in [Not getting response from Express Router](https://stackoverflow.com/questions/64515176/not-getting-response-from-express-router) as shown below:

```
router.post('/register', (req, res) => {
    authController.register_post(req, res);
});
```

### Notification.js

*Line 8 - 18*
```
        <Modal
            open={open}
            onClose={onClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
```

The code above was created by adapting the code in [Hook](https://mui.com/base-ui/react-modal/) as shown below:

```
<Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
      >
```

*Line 19 - 30*
```
<Box sx={{ width: '50%', bgcolor: 'background.paper', p: 4, overflow: 'auto' }}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                    Notifications
                </Typography>
                <List>
                    {notifications.map((notification, index) => (
                        <ListItem key={index}>
                            <ListItemText primary={notification.message} />
                        </ListItem>
                    ))}
                </List>
            </Box>
```
The code above was created by adapting the code in [Basic example](https://mui.com/system/getting-started/the-sx-prop/) as shown below:
```
<Box
        sx={{
          bgcolor: 'background.paper',
          boxShadow: 1,
          borderRadius: 2,
          p: 2,
          minWidth: 300,
        }}
      >
        <Box sx={{ color: 'text.secondary' }}>Sessions</Box>
        <Box sx={{ color: 'text.primary', fontSize: 34, fontWeight: 'medium' }}>
          98.3 K
        </Box>
```

### navbar.js

*Line 88 - 108*
```
const fetchNotifications = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/notification/get-all`, {
        method: 'GET',
        headers : {
          'Authorization':`Bearer ${localStorage.getItem("token")}`,
          'Content-Type':'application/json'
        }
      });
      if (response.ok) {
        const data = await response.json();
        setNotifications(data.notifications);
      } else {
        console.error(response);
        console.error('Failed to fetch notifications:', response.statusText);
      }
    } catch (error) {
      console.error(error);
      console.error('Error fetching notifications:', error.message);
    }
  };
```
The code above was created by adapting the code in [Introduction to JWT](https://medium.com/codex/adding-authentication-to-full-stack-mern-web-application-4974543c3e66) as shown below:

```
const login = (req, res) => {
  /* Destructuring the email and password from the request body. */
  const { email, password } = req.body;

  if (email === EMAIL && password === PASSWORD) {
    /* Creating a token. */
    const token = jwt.sign({ email }, process.env.TOKEN_KEY, {
      expiresIn: "2h",
    });
    return res.status(200).json({
      statusCode: 200,
      msg: "Login successful",
      token,
    });
  }
```

*Line 110 - 134*
```
const handleNotificationClick = async () => {
    if (isLoggedIn) {
      try {
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/notification/get-all`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization':`Bearer ${localStorage.getItem("token")}`
          }
        });
        if (response.ok) {
          const data = await response.json();
          setNotifications(data.notifications);
          setOpenNotificationPopup(true);
          setHasNewNotifications(false);
        } else {
          console.error(response);
          console.error('Failed to fetch notifications:', response.statusText);
        }
      } catch (error) {
        console.error(error);
        console.error('Error fetching notifications:', error.message);
      }
    }
  };
```
The code above was created by adapting the code in [How to fetch API data in React?](https://forum.freecodecamp.org/t/how-to-fetch-api-data-in-react/341210) as shown below:
```
const getRecipes = async() => {
  const response = await fetch(
    `https://api.edamam.com/search?q=chicken&app_id=${API_ID}&app_key=${API_KEY}`
  )
  const data = await response.json();
  console.log(data)
}
```

### Chatbot.js

*Line 36 - 51*
```
const [showChat, setShowChat] = useState(false);
  const [userId, setUserId] = useState(null); 
  const [expenses, setExpenses] = useState([]); 
  const errorNotification = (message) => {
    Swal.fire({
      title: "Expenses did not retireved!",
      text: message,
      icon: "error"
    })
  }
  useEffect(() => {
    const storedUserId = localStorage.getItem("id");
    if (storedUserId) {
      setUserId(storedUserId);
    }
  }, []);
```
The code above was created by adapting the code in [React Hook Rules](https://www.freecodecamp.org/news/how-to-use-the-usestate-and-useeffect-hooks-in-your-project/) as shown below:

```
import React, { useState } from 'react';

function App() {
  const [userName, setUsername] = useState('');
  
  };

  return ( Your JSX code goes in here.....);
};

export default App;
```

*Line 53 - 96*
```
const toggleChat = () => {
    setShowChat(!showChat);
  };

  const steps = [
    {
      id: 'Greet',
      message: 'Hello, Welcome to our FINtastic. How can I assist you today?',
      trigger: 'Options'
    },
    {
      id: 'Options',
      options: [
        { value: 'expenses', label: 'View Expenses', trigger: 'FetchExpenses' },
        { value: 'ticket', label: 'Generate Ticket', trigger: 'GenerateTicket' },
        { value: 'exit', label: 'Exit Chat', trigger: 'EndChat' } 
      ]
    },
    {
      id: 'FetchExpenses',
      component: <FetchExpensesComponent />,
      trigger: 'Options' 
    },
    {
      id: 'GenerateTicket',
      message: 'Please provide a brief description of your issue to generate a ticket.',
      trigger: 'WaitingForIssueDescription'
    },
    {
      id: 'WaitingForIssueDescription',
      user: true,
      trigger: 'TicketGenerated'
    },
    {
      id: 'TicketGenerated',
      message: 'Thank you. Your ticket has been generated. Our support team will contact you shortly.',
      trigger: 'Options' 
    },
    {
      id: 'EndChat',
      message: 'Thank you for using FINtastic. Have a great day!',
      end: true
    }
  ];
```
The code above was created by adapting the code in [Wikipédia Search](https://lucasbassetti.com.br/react-simple-chatbot/#/docs/wikipedia) as shown below:
```
const ExampleDBPedia = () => (
  <ChatBot
    steps={[
      {
        id: '1',
        message: 'Type something to search on Wikipédia. (Ex.: Brazil)',
        trigger: 'search',
      },
      {
        id: 'search',
        user: true,
        trigger: '3',
      },
      {
        id: '3',
        component: <DBPedia />,
        waitAction: true,
        trigger: '1',
      },
    ]}
  />
);
```

### FetchExpenseComponent.js

*Line 52 - 66*
```
<ThemeProvider theme={CHATBOT_THEME}>
            <Typography botFontColor fontFamily gutterBottom>
                Expense List
            </Typography>
            <ul style={{ listStyleType: "none", padding: 0 }}>
                {expenses.map((expense, index) => (
                <li key={index} style={{ marginBottom: "10px" }}>
                    <Typography variant="body1">
                    <strong>Expense Name:</strong> {expense.expenseName},{" "}
                    <strong>Price:</strong> ${expense.expenseAmount}
                    </Typography>
                </li>
                ))}
            </ul>
        </ThemeProvider>
```
The code above was created by adapting the code in [Theming](https://styled-components.com/docs/advanced) as shown below:
```
    <ThemeProvider theme={theme}>
      <Button>Themed</Button>
    </ThemeProvider>
```

#### Source

The code above was adapted from [MUI material](https://www.npmjs.com/package/@mui/material) and [React minimap pie chart](https://www.npmjs.com/package/react-minimal-pie-chart?activeTab=code).

## Acknowledgments

* We deeply appreciate the invaluable insights and dedication demonstrated through the provided code, which laid a solid foundation for comprehending its functionality and logic. Their commitment to their work is commendable.
* Their contribution offered profound insights and significantly impacted my learning journey, shaping my approach to understanding various techniques and approaches. I am genuinely grateful for their efforts and expertise.
* The code Helped me to implement my tasks easily and make my UI really clean and great looking.
* The Code has taught me how to design my application with approach of simplicity and effectiveness. Their contribution is highly apperciated.
