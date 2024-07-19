from flask import Flask, request, jsonify
import concurrent.futures
import json
import logging

app = Flask(__name__)
logging.basicConfig(level=logging.INFO)

@app.route('/ban_players', methods=['POST'])
def ban_players():
    # Validate user input
    if not request.is_json:
        return jsonify({'error': 'Invalid request'}, 400)

    playfab_id = request.json.get('playfab_id')
    secret_key = request.json.get('secret_key')
    reason = request.json.get('reason')
    duration_hours = request.json.get('duration_hours')

    if not all([playfab_id, secret_key, reason, duration_hours]):
        return jsonify({'error': 'Missing required parameters'}, 400)

    # Run the Python script
    segments_response = get_all_segments(playfab_id, secret_key)
    all_players_segment = next((segment for segment in segments_response['data']['Segments'] if segment['Name'] == 'All Players'), None)
    segment_id = all_players_segment['Id']
    users_response = get_segment_users(playfab_id, secret_key, segment_id)
    playfab_ids = [user['PlayerId'] for user in users_response['data']['PlayerProfiles']]
    banned_players = []

    with concurrent.futures.ThreadPoolExecutor(max_workers=30) as executor:
        ban_futures = [executor.submit(ban_single_user, playfab_id, secret_key, playfab_id_, reason, duration_hours) for playfab_id_ in playfab_ids]
        for future in concurrent.futures.as_completed(ban_futures):
            try:
                banned_player = future.result()
                banned_players.append(banned_player)
            except Exception as e:
                logging.error(f"Error banning player {playfab_id_}: {str(e)}")

    # Return the results as JSON
    return jsonify({'banned_players': banned_players})

if __name__ == '__main__':
    app.run(debug=True)
