import React, { Component } from 'react';
import './Home.css';
import Header from '../../common/header/Header';
import { withStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import FormControl from '@material-ui/core/FormControl';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
import FormHelperText from "@material-ui/core/FormHelperText";
import Button from "@material-ui/core/Button";
import {TextField} from "@material-ui/core";
import img1 from '../../assets/img1.jpg';
import img5 from '../../assets/img5.jpg';
import img3 from '../../assets/img3.jpg';
import img6 from '../../assets/img6.jpg';

const TabContainer = function (props) {
    return (
        <Typography component="div" style={{ padding: 0, textAlign: 'center' }}>
            {props.children}
        </Typography>
    )
}

const styles = theme => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper
    },
    upcomingMoviesHeading: {
        textAlign: 'center',
        background: '#ff9999',
        padding: '8px',
        fontSize: '1rem'
    },
    gridListUpcomingMovies: {
        flexWrap: 'nowrap',
        transform: 'translateZ(0)',
        width: '100%'
    },
    gridListMain: {
        transform: 'translateZ(0)',
        cursor: 'pointer'
    },
    formControl: {
        margin: theme.spacing.unit,
        minWidth: 240,
        maxWidth: 240
    },
    title: {
        color: theme.palette.primary.light,
    },
    crd: {
        maxWidth: 345,
    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
    avatar: {
        backgroundColor: red[500],
    }
});



class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {
            movieName: "",
            upcomingMovies: [],
            releasedMovies: [],
            genres: [],
            artists: [],
            genresList: [],
            artistsList: [],
            releaseDateStart: "",
            releaseDateEnd: "",
            loggedIn: sessionStorage.getItem("access-token") == null ? false : true,
            count: 0


        }

    }
    count =0;
    loginClickHandler = () => {
        if (this.state.username === "avinash" && this.state.loginPassword === "pandey") {
            this.state.loggedIn = true;
            this.setState({
                loggedIn: true
            });
        }
    }


    inputUsernameChangeHandler = (e) => {
        this.setState({ username: e.target.value });
    }

    inputLoginPasswordChangeHandler = (e) => {
        this.setState({ loginPassword: e.target.value });
    }
    componentWillMount() {
        // Get upcoming movies
        let data = null;
        let xhr = new XMLHttpRequest();
        let that = this;
        xhr.addEventListener("readystatechange", function () {
            if (this.readyState === 4) {
                that.setState({
                    upcomingMovies: JSON.parse(this.responseText).movies
                });
            }
        });

        xhr.open("GET", this.props.baseUrl + "movies?status=PUBLISHED");
        xhr.setRequestHeader("Cache-Control", "no-cache");
        xhr.send(data);

        // Get released movies


    }



    render() {
        const { classes } = this.props;

        return (
            <div>
                <Header baseUrl={this.props.baseUrl} />

                { this.state.loggedIn === false &&

                <div className="homeform">
                <TabContainer>
                    <Tabs className="tabs" value={this.state.value} onChange={this.tabChangeHandler}>
                        <Tab label="Login" />
                    </Tabs>
                    <FormControl required>
                        <InputLabel htmlFor="username">Username</InputLabel>
                        <Input id="username" type="text" username={this.state.username} onChange={this.inputUsernameChangeHandler} />
                        <FormHelperText className={this.state.usernameRequired}>
                            <span className="red">required</span>
                        </FormHelperText>
                    </FormControl>
                    <br /><br />
                    <FormControl required>
                        <InputLabel htmlFor="loginPassword">Password</InputLabel>
                        <Input id="loginPassword" type="password" loginpassword={this.state.loginPassword} onChange={this.inputLoginPasswordChangeHandler} />
                        <FormHelperText className={this.state.loginPasswordRequired}>
                            <span className="red">required</span>
                        </FormHelperText>
                    </FormControl>
                    <br /><br />
                    {this.state.loggedIn === true &&
                    <FormControl>
                                    <span className="successText">
                                        Login Successful!
                                    </span>
                    </FormControl>
                    }
                    <br /><br />
                    <Button variant="contained" color="primary" onClick={this.loginClickHandler}>LOGIN</Button>
                </TabContainer></div>
                }
                { this.state.loggedIn === true &&

                <div className="flex-container">

                        <Card className={classes.crd}>
                            <CardHeader
                                avatar={
                                    <Avatar aria-label="recipe" className={classes.avatar}>
                                        R
                                    </Avatar>
                                }
                                action={
                                    <IconButton aria-label="settings">
                                        <MoreVertIcon/>
                                    </IconButton>
                                }
                                title="Upgrad"
                                subheader="September 14, 2016"
                            />
                            <CardMedia
                                className={classes.media}
                                image={img1}
                                title="Paella dish"
                            />
                            <CardContent>
                                <Typography variant="body2" color="textSecondary" component="p">
                                    This is the latest pics!!Cool
                                </Typography>
                            </CardContent>
                            <CardActions disableSpacing>

                                <IconButton id ="myid" aria-label="add to favorites" onClick={this.Count}>
                                    <FavoriteIcon/>{ this.count}Likes
                                </IconButton>
                                <div>   </div>
                                <TextField id="standard-basic" label="Standard" />
                                    <Button variant="contained" color="primary">
                                        Add
                                    </Button>
                            </CardActions>

                        </Card>
                    <Card className={classes.crd}>
                        <CardHeader
                            avatar={
                                <Avatar aria-label="recipe" className={classes.avatar}>
                                    R
                                </Avatar>
                            }
                            action={
                                <IconButton aria-label="settings">
                                    <MoreVertIcon/>
                                </IconButton>
                            }
                            title="Upgrad"
                            subheader="September 14, 2016"
                        />
                        <CardMedia
                            className={classes.media}
                            image={img5}
                            title="Paella dish"
                        />
                        <CardContent>
                            <Typography variant="body2" color="textSecondary" component="p">
                                This is the latest pics!!Cool
                            </Typography>
                        </CardContent>
                        <CardActions disableSpacing>

                            <IconButton id ="myid" aria-label="add to favorites" onClick={this.Count}>
                                <FavoriteIcon/>{ this.count}Likes
                            </IconButton>
                            <div>   </div>
                            <TextField id="standard-basic" label="Standard" />
                            <Button variant="contained" color="primary">
                                Add
                            </Button>
                        </CardActions>

                    </Card>
                    <Card className={classes.crd}>
                        <CardHeader
                            avatar={
                                <Avatar aria-label="recipe" className={classes.avatar}>
                                    R
                                </Avatar>
                            }
                            action={
                                <IconButton aria-label="settings">
                                    <MoreVertIcon/>
                                </IconButton>
                            }
                            title="Upgrad"
                            subheader="September 14, 2016"
                        />
                        <CardMedia
                            className={classes.media}
                            image={img6}
                            title="Paella dish"
                        />
                        <CardContent>
                            <Typography variant="body2" color="textSecondary" component="p">
                                This is the latest pics!!Cool
                            </Typography>
                        </CardContent>
                        <CardActions disableSpacing>

                            <IconButton id ="myid" aria-label="add to favorites" onClick={this.Count}>
                                <FavoriteIcon/>{ this.count}Likes
                            </IconButton>
                            <div>   </div>
                            <TextField id="standard-basic" label="Standard" />
                            <Button variant="contained" color="primary">
                                Add
                            </Button>
                        </CardActions>

                    </Card>
                    <Card className={classes.crd}>
                        <CardHeader
                            avatar={
                                <Avatar aria-label="recipe" className={classes.avatar}>
                                    R
                                </Avatar>
                            }
                            action={
                                <IconButton aria-label="settings">
                                    <MoreVertIcon/>
                                </IconButton>
                            }
                            title="Upgrad"
                            subheader="September 14, 2016"
                        />
                        <CardMedia
                            className={classes.media}
                            image={img3}
                            title="Paella dish"
                        />
                        <CardContent>
                            <Typography variant="body2" color="textSecondary" component="p">
                                This is the latest pics!!Cool
                            </Typography>
                        </CardContent>
                        <CardActions disableSpacing>

                            <IconButton id ="myid" aria-label="add to favorites" onClick={this.Count}>
                                <FavoriteIcon/>{ this.count}Likes
                            </IconButton>
                            <div>   </div>
                            <TextField id="standard-basic" label="Standard" />
                            <Button variant="contained" color="primary">
                                Add
                            </Button>
                        </CardActions>

                    </Card>

                </div> }
            </div >
        )
    }
}

export default withStyles(styles)(Home);