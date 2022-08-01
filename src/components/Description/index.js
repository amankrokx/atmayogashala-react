import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Chip from "@mui/material/Chip"
import Rating from "@mui/material/Rating"


const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function RecipeReviewCard(props) {
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card sx={{ 
        maxWidth: '100%',
        margin: '10px',
        fontSize: '30px',
     }}>
      {/* <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: '#000000' }} aria-label="recipe">
            I
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <span className='material-icons'>more_vert</span>
          </IconButton>
        }
        title={props.info.title}
        subheader={props.info.date} 
      /> */}

      <Typography style={{margin: 10}}>
        <Chip
          avatar={<Avatar alt={props.info.author.name} src={props.info.author.photo || null}>{props.info.author.photo ? null : props.info.author.name.charAt(0)}</Avatar>}
          label={props.info.author.name}
          color="secondary"
          size="large"
          variant="filled"

          style={{
            float: 'right',
            marginRight: '20px',
            marginTop: '10px',
          }}
          />
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          marginLeft: 20,
        }}>
          <span style={{
            fontSize: '25px',
            fontWeight: 600,
          }}>
            {props.info.title}
          </span>
          <span style={{
            fontSize: '10px'
          }}>
            {props.info.date}
          </span>
        </div>
      </Typography>
      <div style={{
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'nowrap',
        justifyContent: 'center',
        alignItems: 'Stretch',
        alignContent: 'center',
      }}>
        <CardMedia
            component="img"
            height="380"
            // width = "400"
            image={props.info.photo}
            alt="Fit yogi"
            style={{
                margin: '10px',
                width: '60%',
                maxHeight: 'fit-content',
            }}
        />
        <CardContent style={{
            width: '40%'
        }}>
            <Typography variant="body2" color="text.secondary" fontSize={'20px'}>
            {props.info.description1}
            </Typography>
        </CardContent>
      </div>

      <CardActions disableSpacing style={{justifyContent: 'space around', marginLeft: 5}}>
        <IconButton aria-label="add to favorites">
          <span className='material-icons'>favorite</span>
        </IconButton>
        <IconButton aria-label="share">
          <span className='material-icons'>share</span>
        </IconButton>
      </CardActions>
        <CardContent>
          <Typography paragraph style={{fontSize: 20, fontWeight: 'bold'}}>Description: </Typography>
          <Typography paragraph style={{fontSize: 15}}>
            {props.info.description2}
          </Typography>
          <Typography paragraph style={{fontSize: 15}}>
            {props.info.description3}
          </Typography>
          <Typography paragraph style={{fontSize: 15}}>
            {props.info.description3}
          </Typography>
          <Typography style={{alignSelf: 'center'}}>
            {props.info.tagline}
          </Typography>
        </CardContent>
    </Card>
  );
}
