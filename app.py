from flask import Flask, request, jsonify
import concurrent.futures
import json

app = Flask(__name__)

@app.route('/ban_players', methods=['POST'])
def ban_players():
    # Get user input from request body
    playfab_id = request.form['playfab_id']
    secret_key = request.form['secret_key']
    reason = request.form['reason']
    duration_hours = int(request.form['duration_hours'])

    # Run the Python script
    segments_response = get_all_segments(playfab_id, secret_key)
    all_players_segment = next((segment for segment in segments_response['data']['Segments'] if segment['Name'] == 'All Players'), None)
    segment_id = all_players_segment['Id']
    users_response = get_segment_users(playfab_id, secret_key, segment_id)
    playfab_ids = [user['PlayerId'] for user in users_response['data']['PlayerProfiles']]
    banned_players = []

    with concurrent.futures.ThreadPoolExecutor(max_workers=30) as executor:
        ban_futures = [executor.submit(ban_single_user, playfab_id, secret_key, playfab_id, reason, duration_hours) for playfab_id in playfab_ids]
        for future in concurrent.futures.as_completed(ban_futures):
            banned_player = future.result()
            banned_players.append(banned_player)

    # Return the results as JSON
    return jsonify({'banned_players': banned_players})

if __name__ == '__main__':
    app.run(debug=True)
