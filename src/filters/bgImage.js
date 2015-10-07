export default (image) => {
  image = image || 'https://dn-segai.qbox.me/mine/default_story_thumbnail.png'
  return `background-image:url(${image});`
}