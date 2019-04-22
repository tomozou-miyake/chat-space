json.array! @new_messages do |message|
  json.user_name   message.user.name
  json.create_date  message.created_at.strftime("%Y/%m/%d %H:%M")
  json.content     message.content
  json.image_url   message.image.url
  json.id          message.id
end